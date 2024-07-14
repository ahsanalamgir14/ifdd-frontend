import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature } from 'ol';
import { finalize } from 'rxjs';
import { MapService } from 'src/app/map/map.service';
import { Category } from 'src/app/thematiques/category';
import { Thematique } from 'src/app/thematiques/thematique';
import { ThematiqueService } from 'src/app/thematiques/thematique.service';
import { Innovation } from 'src/app/innovations/innovation';
import { InnovationService } from 'src/app/innovations/innovation.service';
import { Results } from 'src/app/innovations/results';
import { MapLocation } from 'src/app/places/map-location';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnDestroy, OnInit {
  @Input() thematiqueNumber: string =  '';
  @Input() innovationId?: number;
  private _mobileQueryListener: () => void;
  private _open = false;
  mobileQuery: MediaQueryList;
  thematiques: Thematique[] = [];
  selectedThematique: Thematique | null = null;
  selectedCategories: Category[] = [];
  selectedInnovation: Innovation | null = null;
  innovations: Innovation[] = [];
  showInnovations: boolean = false;
  loading = false;
  ready = false;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private thematiqueService: ThematiqueService,
    private innovationService: InnovationService,
    private mapService: MapService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    if (this.thematiqueNumber) {
      this._open = true;
      this.showInnovations = true;
    } else if (this.innovationId) {
      this.innovationService.get(this.innovationId).subscribe((innovation: Innovation) => {
        this.selectedInnovation = innovation;
        this.onShowInnovations();
      });
    }
    this.getThematiques();
    this.mapService.selected.subscribe((innovation: Innovation) => {
      this.selectedInnovation = null;
      this.onSelectInnovation(innovation);
      this.hideMap();
      this.changeDetectorRef.detectChanges();
    });

    this.mapService.hidden.subscribe((hidden: boolean) => {
      if (hidden) {
        this.hideMap();
      } else {
        this.showMap();
      }
    })
  }

  ngOnDestroy(): void {
    const body = document.body;
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
    body.classList.remove('overflow-hidden');
  }

  onSelectThematique(thematique: Thematique): void {
    this.selectedThematique = thematique;
  }

  selectedInnovationsCount(): number {
    if (this.selectedThematique) {
      return this.selectedThematique.count_innovation;
    }

    return this.innovations.length;
  }

  reinitialize(hideInnovations:boolean = false): void {
    if (hideInnovations) {
      this.hideInnovations();
    }

    this.selectedThematique = null;
    this.selectedInnovation = null;
    this.selectedCategories = [];
    this.mapService.removeMarkers();
    this.mapService.removeZoom();
    this.getInnovations();
    this.mapService.setHasResults(false);
  }

  isOpen(): boolean {
    if (this.mobileQuery.matches) {
      return this._open;
    }

    return true;
  }

  toggle() {
    this._open = !this._open;
    const body = document.body;
    if (this._open) {
      body.classList.add('overflow-hidden');
    } else {
      body.classList.remove('overflow-hidden');
    }
  }

  onShowInnovations(): void {
    this.showInnovations = true;
    this.mapService.setHasResults(true);
    if (this.selectedThematique) {
      this.getInnovations();
    }
  }

  hideInnovations(): void {
    this.showInnovations = false;
    this.onCloseInnovationDetails();
    this.mapService.removeZoom();
  }

  onCategoriesSelection(categories: Category[]): void {
    this.selectedCategories = categories;
  }

  unselectCategory(position: number) {
    this.selectedCategories.splice(position, 1);
  }

  onSelectInnovation(innovation: Innovation): void {
    this.selectedInnovation = innovation;
    this.router.navigate(['/'], {queryParams: {innovationId: innovation.id}, queryParamsHandling: 'merge'});
  }

  onSelectInnovationFromSidebar(innovation: Innovation): void {
    this.onSelectInnovation(innovation);
    if (innovation.id) {
      this.mapService.selectById(innovation.id);
    }
  }

  onCloseInnovationDetails(): void {
    this.selectedInnovation = null;
    if (this.mobileQuery.matches) {
      this.showMap();
    }
    this.mapService.select(new Feature());
    this.router.navigate(['/']);
  }

  onPlaceSelected(place: MapLocation|null): void {
    if (place?.innovation) {
      if (place.innovation.longitude && place.innovation.latitude) {
        const longitude = Number.parseFloat(place.innovation.longitude);
        const latitude = Number.parseFloat(place.innovation.latitude);
        const coordinates = [longitude, latitude]
        this.mapService.addMarker(coordinates, place.innovation);
      }
    }
    this.mapService.selectLocation(place);
  }

  private getInnovations(push: boolean = false, url?: string): void {
    if (!push) {
      this.innovations = [];
    }

    if (this.selectedCategories.length > 0) {
      this.searchInnovations();
      return;
    }

    this.loading = true;

    this.innovationService.getAll(url).pipe(
      finalize(() => this.loading = false)
    )
    .subscribe((innovations: Results<Innovation>) => {
      if (push) {
        this.innovations.push(...innovations.data);;
      } else {
        this.mapService.removeMarkers();
        this.innovations = innovations.data;
      }

      innovations.data.forEach((innovation: Innovation, index: number) => {
        if (innovation.longitude && innovation.latitude) {
          const longitude = Number.parseFloat(innovation.longitude);
          const latitude = Number.parseFloat(innovation.latitude);
          const coordinates = [longitude, latitude]
          this.mapService.addMarker(coordinates, innovation);
        }
      });

      if (innovations.next) {
        this.getInnovations(true, innovations.next);
      } else {
        if (this.ready === false && this.innovationId && this.selectedInnovation) {
          this.onSelectInnovationFromSidebar(this.selectedInnovation);
        }

        this.ready = true;
      }
    });
  }

  private searchInnovations(): void {
    this.loading = true;

    this.innovationService.search(this.selectedCategories).pipe(
      finalize(() => this.loading = false)
    )
    .subscribe((innovations: Innovation[]) => {
      this.innovations = innovations;
      this.mapService.removeMarkers();
      this.innovations.forEach((innovation: Innovation, index: number) => {
        if (innovation.longitude && innovation.latitude) {
          const longitude = Number.parseFloat(innovation.longitude);
          const latitude = Number.parseFloat(innovation.latitude);
          const coordinates = [longitude, latitude]
          this.mapService.addMarker(coordinates, innovation);
        }
      });
    });
  }

  showMap(): void {
    this.showInnovations = false;
    this._open = false;
  }

  hideMap(): void {
    this.showInnovations = true;
    this._open = true;
  }

  getCssClasses(): string {
    let classes = '';

    // Have to test each case to prevent the default ngClass behavior:
    // Removing classes that don't match the condition

    if (!this.isOpen()) {
      classes = 'top-12 z-10';
    }

    if (this.isOpen() && !this.showInnovations) {
      classes = 'top-0 z-20';
    }

    if (this.isOpen() && this.showInnovations) {
      classes = 'top-0 bottom-0 bg-secondary z-10';
    }

    return classes;
  }

  private getThematiques(): void {
    this.loading = true;
    this.thematiqueService.getAll()
      .pipe(
        finalize(() => {
          if (!this.thematiqueNumber) {
            this.loading = false
          }
        })
      )
      .subscribe(data => {
        this.thematiques = data;
        if (this.thematiqueNumber) {
          this.selectThematique();
        } else {
          this.getInnovations();
        }
      });
  }

  private selectThematique(): void {
    const existingThematique = this.thematiques.find((thematique: Thematique) => thematique.number === this.thematiqueNumber);

    if (existingThematique) {
      this.onSelectThematique(existingThematique);
      this.thematiqueService.get(existingThematique.id).subscribe((thematique: Thematique|null) => {
        if (thematique) {
          this.selectedCategories = thematique.categories;
          this.onShowInnovations();
        }
      })
    }
  }

  innovationTrackBy(index: number, innovation: Innovation):  number {
    if (innovation.id) {
      return innovation.id;
    }

    return 0;
  }
}
