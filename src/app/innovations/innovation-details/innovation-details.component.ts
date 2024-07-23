import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { MapService } from 'src/app/map/map.service';
import { Category } from 'src/app/thematiques/category';
import { Thematique } from 'src/app/thematiques/thematique';
import { ThematiqueService } from 'src/app/thematiques/thematique.service';
import { Innovation } from '../innovation';
import { InnovationService } from '../innovation.service';
import { StorageService } from 'src/app/core/storage/storage.service';

@Component({
  selector: 'app-innovation-details',
  templateUrl: './innovation-details.component.html'
})
export class InnovationDetailsComponent implements OnInit {
  @Input() set selectedInnovation(innovation: Innovation) {
    this.innovation = innovation;
    this.getInnovation();
  };
  @Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();
  innovation?: Innovation;
  thematiques: Thematique[] = [];
  loading: boolean = false;
  colors: any = {};
  similarInnovations: Innovation[] = [];
  similarInnovationsSlice: number = 3;
  showCategoriesDetails: boolean = false;
  showAllInterventionZones: boolean = false;
  language: string | null = 'fr';

  get absoluteUrl(): string {
    return window.location.href;
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private innovationService: InnovationService,
    private mapService: MapService,
    private storage: StorageService,
    thematiqueService: ThematiqueService
  ) {
    this.colors = thematiqueService.getColors();
  }
  ngOnInit(): void {
    this.language = this.storage.getItem('language');
    console.log(this.language)
  }

  getInnovation(): void {
    if (this.innovation?.id) {
      this.loading = true;
      this.innovationService.get(this.innovation.id).pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((innovation: Innovation) => {
        this.innovation = innovation;
        this.similarInnovationsSlice = 3;
        this.getThematiques();
        this.getSimilarInnovations();
        this.mapService.setHasSelected(true);
        this.changeDetector.detectChanges();
        this.changed.emit(true);
      })
    }
  }

  onHide(): void {
    this.hide.emit(true);
    this.mapService.setHasSelected(false);
  }

  onShowMap(): void {
    this.mapService.show();
  }

  onToggleCategoriesDetails(): void {
    this.showCategoriesDetails = !this.showCategoriesDetails;
  }

  onToggleInterventionZones(): void {
    this.showAllInterventionZones = !this.showAllInterventionZones;
  }

  loadMoreInnovations(): void {
    if ((this.similarInnovations.length - this.similarInnovationsSlice) >= 3) {
      this.similarInnovationsSlice += 3;
    } else {
      this.similarInnovationsSlice = this.similarInnovations.length;
    }

    this.changeDetector.detectChanges();
  }

  selectInnovation(innovation: Innovation): void {
    this.selectedInnovation = innovation;
    if (innovation.longitude && innovation.latitude && innovation.id) {
      const longitude = Number.parseFloat(innovation.longitude);
      const latitude = Number.parseFloat(innovation.latitude);
      const coordinates = [longitude, latitude]
      this.mapService.addMarker(coordinates, innovation);
      this.mapService.selectById(innovation.id);
    }
  }

  private getThematiques(): void {
    this.thematiques = [];
    this.innovation?.categorieThematiques.forEach((category: Category) => {
      if (this.thematiques.find(thematique => thematique.id === category.thematique.id) === undefined) {
        this.thematiques.push(category.thematique);
      }
    });
  }

  private getSimilarInnovations(): void {
    if (this.innovation && this.innovation.categorieThematiques) {
      this.innovationService.search(this.innovation.categorieThematiques).pipe(
        finalize(() => this.loading = false)
      ).subscribe((innovations: Innovation[]) => {
        this.similarInnovations = innovations.filter((innovation: Innovation) => innovation.id !== this.innovation?.id);
      });
    }
  }
}
