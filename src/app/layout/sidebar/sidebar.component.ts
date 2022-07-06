import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature } from 'ol';
import { finalize } from 'rxjs';
import { MapService } from 'src/app/map/map.service';
import { Category } from 'src/app/odds/category';
import { Odd } from 'src/app/odds/odd';
import { OddService } from 'src/app/odds/odd.service';
import { Osc } from 'src/app/oscs/osc';
import { OscService } from 'src/app/oscs/osc.service';
import { Results } from 'src/app/oscs/results';
import { MapLocation } from 'src/app/places/map-location';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnDestroy, OnInit {
  @Input() oddNumber: string =  '';
  @Input() oscId?: number;
  private _mobileQueryListener: () => void;
  private _open = false;
  mobileQuery: MediaQueryList;
  odds: Odd[] = [];
  selectedOdd: Odd | null = null;
  selectedCategories: Category[] = [];
  selectedOsc: Osc | null = null;
  oscs: Osc[] = [];
  showOscs: boolean = false;
  loading = false;
  ready = false;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private oddService: OddService,
    private oscService: OscService,
    private mapService: MapService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    if (this.oddNumber) {
      this._open = true;
      this.showOscs = true;
    } else if (this.oscId) {
      this.oscService.get(this.oscId).subscribe((osc: Osc) => {
        this.selectedOsc = osc;
        this.onShowOscs();
      });
    }
    this.getOdds();
    this.mapService.selected.subscribe((osc: Osc) => {
      this.selectedOsc = null;
      this.onSelectOsc(osc);
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

  onSelectOdd(odd: Odd): void {
    this.selectedOdd = odd;
  }

  selectedOscsCount(): number {
    if (this.selectedOdd) {
      return this.selectedOdd.count_osc;
    }

    return this.oscs.length;
  }

  reinitialize(hideOscs:boolean = false): void {
    if (hideOscs) {
      this.hideOscs();
    }

    this.selectedOdd = null;
    this.selectedOsc = null;
    this.selectedCategories = [];
    this.mapService.removeMarkers();
    this.mapService.removeZoom();
    this.getOscs();
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

  onShowOscs(): void {
    this.showOscs = true;
    this.mapService.setHasResults(true);
    if (this.selectedOdd) {
      this.getOscs();
    }
  }

  hideOscs(): void {
    this.showOscs = false;
    this.onCloseOscDetails();
    this.mapService.removeZoom();
  }

  onCategoriesSelection(categories: Category[]): void {
    this.selectedCategories = categories;
  }

  unselectCategory(position: number) {
    this.selectedCategories.splice(position, 1);
  }

  onSelectOsc(osc: Osc): void {
    this.selectedOsc = osc;
    this.router.navigate(['/'], {queryParams: {oscId: osc.id}, queryParamsHandling: 'merge'});
  }

  onSelectOscFromSidebar(osc: Osc): void {
    this.onSelectOsc(osc);
    if (osc.id) {
      this.mapService.selectById(osc.id);
    }
  }

  onCloseOscDetails(): void {
    this.selectedOsc = null;
    if (this.mobileQuery.matches) {
      this.showMap();
    }
    this.mapService.select(new Feature());
    this.router.navigate(['/']);
  }

  onPlaceSelected(place: MapLocation|null): void {
    if (place?.osc) {
      if (place.osc.longitude && place.osc.latitude) {
        const longitude = Number.parseFloat(place.osc.longitude);
        const latitude = Number.parseFloat(place.osc.latitude);
        const coordinates = [longitude, latitude]
        this.mapService.addMarker(coordinates, place.osc);
      }
    }
    this.mapService.selectLocation(place);
  }

  private getOscs(push: boolean = false, url?: string): void {
    if (!push) {
      this.oscs = [];
    }

    if (this.selectedCategories.length > 0) {
      this.searchOscs();
      return;
    }

    this.loading = true;

    this.oscService.getAll(url).pipe(
      finalize(() => this.loading = false)
    )
    .subscribe((oscs: Results<Osc>) => {
      if (push) {
        this.oscs.push(...oscs.data);;
      } else {
        this.mapService.removeMarkers();
        this.oscs = oscs.data;
      }

      oscs.data.forEach((osc: Osc, index: number) => {
        if (osc.longitude && osc.latitude) {
          const longitude = Number.parseFloat(osc.longitude);
          const latitude = Number.parseFloat(osc.latitude);
          const coordinates = [longitude, latitude]
          this.mapService.addMarker(coordinates, osc);
        }
      });

      if (oscs.next) {
        this.getOscs(true, oscs.next);
      } else {
        if (this.ready === false && this.oscId && this.selectedOsc) {
          this.onSelectOscFromSidebar(this.selectedOsc);
        }

        this.ready = true;
      }
    });
  }

  private searchOscs(): void {
    this.loading = true;

    this.oscService.search(this.selectedCategories).pipe(
      finalize(() => this.loading = false)
    )
    .subscribe((oscs: Osc[]) => {
      this.oscs = oscs;
      this.mapService.removeMarkers();
      this.oscs.forEach((osc: Osc, index: number) => {
        if (osc.longitude && osc.latitude) {
          const longitude = Number.parseFloat(osc.longitude);
          const latitude = Number.parseFloat(osc.latitude);
          const coordinates = [longitude, latitude]
          this.mapService.addMarker(coordinates, osc);
        }
      });
    });
  }

  showMap(): void {
    this.showOscs = false;
    this._open = false;
  }

  hideMap(): void {
    this.showOscs = true;
    this._open = true;
  }

  getCssClasses(): string {
    let classes = '';

    // Have to test each case to prevent the default ngClass behavior:
    // Removing classes that don't match the condition

    if (!this.isOpen()) {
      classes = 'top-12 z-10';
    }

    if (this.isOpen() && !this.showOscs) {
      classes = 'top-0 z-20';
    }

    if (this.isOpen() && this.showOscs) {
      classes = 'top-0 bottom-0 bg-secondary z-10';
    }

    return classes;
  }

  private getOdds(): void {
    this.loading = true;
    this.oddService.getAll()
      .pipe(
        finalize(() => {
          if (!this.oddNumber) {
            this.loading = false
          }
        })
      )
      .subscribe(data => {
        this.odds = data;
        if (this.oddNumber) {
          this.selectOdd();
        } else {
          this.getOscs();
        }
      });
  }

  private selectOdd(): void {
    const existingOdd = this.odds.find((odd: Odd) => odd.number === this.oddNumber);

    if (existingOdd) {
      this.onSelectOdd(existingOdd);
      this.oddService.get(existingOdd.id).subscribe((odd: Odd|null) => {
        if (odd) {
          this.selectedCategories = odd.categories;
          this.onShowOscs();
        }
      })
    }
  }

  oscTrackBy(index: number, osc: Osc):  number {
    if (osc.id) {
      return osc.id;
    }

    return 0;
  }
}
