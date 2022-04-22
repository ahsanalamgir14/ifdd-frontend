import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { finalize, Observable } from 'rxjs';
import { MapService } from 'src/app/map/map.service';
import { Category } from 'src/app/odds/category';
import { Odd } from 'src/app/odds/odd';
import { OddService } from 'src/app/odds/odd.service';
import { Osc } from 'src/app/oscs/osc';
import { OscService } from 'src/app/oscs/osc.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnDestroy, OnInit {
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

  constructor(
    changeDetectorRef: ChangeDetectorRef,
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
    this.getOdds();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  onSelectOdd(odd: Odd): void {
    this.selectedOdd = odd;
  }

  selectedOscsCount(): number {
    if (this.selectedOdd) {
      return this.selectedOdd.number_categorie;
    }

    let count = 0;
    this.odds.forEach(odd => count += odd.number_categorie);

    return count;
  }

  reinitialize(): void {
    this.selectedOdd = null;
  }

  isOpen(): boolean {
    if (this.mobileQuery.matches) {
      return this._open;
    }

    return true;
  }

  toggle() {
    this._open = !this._open;
  }

  onShowOscs(): void {
    this.showOscs = true;
    this.getOscs();
  }

  hideOscs(): void {
    this.showOscs = false;
  }

  onCategoriesSelection(categories: Category[]): void {
    this.selectedCategories = categories;
  }

  unselectCategory(position: number) {
    this.selectedCategories.splice(position, 1);
  }

  onSelectOsc(osc: Osc): void {
    this.selectedOsc = osc;
  }

  onCloseOscDetails(): void {
    this.selectedOsc = null;
  }

  private getOscs(): void {
    this.loading = true;
    let oscs$: Observable<Osc[]>;
    if (this.selectedCategories.length > 0) {
      oscs$ = this.oscService.search(this.selectedCategories)
    } else {
      oscs$ = this.oscService.getAll();
    }

    oscs$.pipe(
      finalize(() => this.loading = false)
    )
    .subscribe((oscs: Osc[]) => {
      this.oscs = oscs;
      this.mapService.removeMarkers();
      this.oscs.forEach((osc: Osc) => {
        if (osc.longitude && osc.latitude) {
          const longitude = Number.parseFloat(osc.longitude);
          const latitude = Number.parseFloat(osc.latitude);
          this.mapService.addMarker([longitude, latitude], 'org');
        }
      })
    });
  }

  private getOdds(): void {
    this.loading = true;
    this.oddService.getAll()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(data => {
        this.odds = data;
      });
  }
}
