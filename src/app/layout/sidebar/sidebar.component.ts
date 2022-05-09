import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { fromLonLat } from 'ol/proj';
import { finalize, Observable } from 'rxjs';
import { MapService } from 'src/app/map/map.service';
import { Category } from 'src/app/odds/category';
import { Odd } from 'src/app/odds/odd';
import { OddService } from 'src/app/odds/odd.service';
import { Osc } from 'src/app/oscs/osc';
import { OscService } from 'src/app/oscs/osc.service';
import { MapLocation } from 'src/app/places/map-location';

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
  oscsCount: number = 0;

  constructor(
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
    this.getOdds();
    this.mapService.selected.subscribe((osc: Osc) => {
      this.selectedOsc = null;
      this.onSelectOsc(osc);
      this.changeDetectorRef.detectChanges();
    });

    this.mapService.hidden.subscribe((hidden: boolean) => {
      this.toggle();
      if (hidden && this.oscs.length !== 0) {
        this.showOscs = true;
      }
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  onSelectOdd(odd: Odd): void {
    this.selectedOdd = odd;
  }

  selectedOscsCount(): number {
    if (this.selectedOdd) {
      return this.selectedOdd.count_osc;
    }

    return this.oscsCount;
  }

  reinitialize(): void {
    this.selectedOdd = null;
    this.selectedCategories = [];
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

  onPlaceSelected(place: MapLocation|null): void {
    if (place) {
      this.mapService.zoomToMarker(fromLonLat([place.longitude, place.latitude]));
    } else {
      this.mapService.removeZoom();
    }
  }

  private countOscs(): void {
    this.oscService.count().subscribe((count: number) => {
      this.oscsCount = count;
    })
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
      this.oscs.forEach((osc: Osc, index: number) => {
        if (osc.longitude && osc.latitude) {
          const longitude = Number.parseFloat(osc.longitude);
          const latitude = Number.parseFloat(osc.latitude);
          const coordinates = [longitude, latitude]
          this.mapService.addMarker(coordinates, osc);

          if (index === 0) {
            // Zoom to the first marker
            this.mapService.zoomToMarker(fromLonLat(coordinates));
          }
        }
      });
    });
  }

  showMap(): void {
    this.showOscs = false;
    this.toggle();
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
        finalize(() => this.loading = false)
      )
      .subscribe(data => {
        this.odds = data;
        this.countOscs();
      });
  }
}
