import { ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { finalize } from 'rxjs';
import { MapService } from 'src/app/map/map.service';
import { Category } from 'src/app/odds/category';
import { Odd } from 'src/app/odds/odd';
import { OddService } from 'src/app/odds/odd.service';
import { Osc } from '../osc';
import { OscService } from '../osc.service';

@Component({
  selector: 'app-osc-details',
  templateUrl: './osc-details.component.html'
})
export class OscDetailsComponent {
  @Input() set selectedOsc(osc: Osc) {
    this.osc = osc;
    this.getOsc();
  };
  @Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() changed: EventEmitter<boolean> = new EventEmitter<boolean>();
  osc?: Osc;
  odds: Odd[] = [];
  loading: boolean = false;
  colors: any = {};
  similarOscs: Osc[] = [];
  similarOscsSlice: number = 3;
  showCategoriesDetails: boolean = false;
  showAllInterventionZones: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef,
    private oscService: OscService,
    private mapService: MapService,
    oddService: OddService
  ) {
    this.colors = oddService.getColors();
  }

  getOsc(): void {
    if (this.osc?.id) {
      this.loading = true;
      this.oscService.get(this.osc.id).pipe(
        finalize(() => this.loading = false)
      )
      .subscribe((osc: Osc) => {
        this.osc = osc;
        this.similarOscsSlice = 3;
        this.getOdds();
        this.getSimilarOscs();
        this.changeDetector.detectChanges();
        this.changed.emit(true);
      })
    }
  }

  onHide(): void {
    this.hide.emit(true);
  }

  onToggleCategoriesDetails(): void {
    this.showCategoriesDetails = !this.showCategoriesDetails;
  }

  onToggleInterventionZones(): void {
    this.showAllInterventionZones = !this.showAllInterventionZones;
  }

  loadMoreOscs(): void {
    if ((this.similarOscs.length - this.similarOscsSlice) >= 3) {
      this.similarOscsSlice += 3;
    } else {
      this.similarOscsSlice = this.similarOscs.length;
    }

    this.changeDetector.detectChanges();
  }

  selectOsc(osc: Osc): void {
    this.selectedOsc = osc;
    if(osc.id) {
      this.mapService.selectById(osc.id);
    }
  }

  private getOdds(): void {
    this.odds = [];
    this.osc?.categorieOdds.forEach((category: Category) => {
      if (this.odds.find(odd => odd.id === category.odd.id) === undefined) {
        this.odds.push(category.odd);
      }
    });
  }

  private getSimilarOscs(): void {
    if (this.osc && this.osc.categorieOdds) {
      this.oscService.search(this.osc.categorieOdds).pipe(
        finalize(() => this.loading = false)
      ).subscribe((oscs: Osc[]) => {
        this.similarOscs = oscs.filter((osc: Osc) => osc.id !== this.osc?.id);
      });
    }
  }
}
