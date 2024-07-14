import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { debounceTime, distinctUntilChanged, map, merge, mergeMap, Subject, switchMap } from 'rxjs';
import { Innovation } from 'src/app/innovations/innovation';
import { InnovationService } from 'src/app/innovations/innovation.service';
import { MapLocation } from 'src/app/places/map-location';
import { PlaceService } from 'src/app/places/place.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html'
})
export class SearchBarComponent implements OnInit {
  private _mobileQueryListener: () => void;
  private searchText$ = new Subject<string>();
  @Input() isFull: boolean = true;
  @Input() isRounded: boolean = true;
  @Output() selected: EventEmitter<MapLocation|null> = new EventEmitter<MapLocation|null>()
  mobileQuery: MediaQueryList;
  places: MapLocation[] = [];
  showPlaces: boolean = false;
  loading: boolean = false;
  iconTypesMapping: any = {
    "siège d'organization": "star",
    "ville": "pin",
    "region": "pin",
    "zone d'intervention": "round"
  };
  place:string = '';

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private placeService: PlaceService,
    private innovationService: InnovationService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.searchText$
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap((name: any) => {
          this.places = [];
          return merge(
            this.placeService.searchPlaces(name),
            this.innovationService.searchByName(name).pipe(
              map((innovations: Innovation[]) => innovations.map((innovation: any) => {
                const location = new MapLocation(innovation.name, innovation.longitude, innovation.latitude, []);
                location.id = innovation.id;
                location.type = 'siege';
                location.innovation = innovation;

                return location;
              }))
            )
          );
        }),
      ).subscribe((places: MapLocation[]) => {
        this.places.push(...places);
      })
  }

  search(name: string): void {
    this.showPlaces = name.length >= 3;
    this.searchText$.next(name);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  getIconType(place: MapLocation): string {
    if (place.id) {
      return 'star';
    }

    return 'pin';
  }

  onSelect(place: MapLocation): void {
    this.place = `${place.name}`;
    this.showPlaces = false;
    this.selected.emit(place);
  }

  onClear(): void {
    this.place = '';
    this.showPlaces = false;
    this.selected.emit(null);
  }

  getOverlayOffset(): number {
    if (this.mobileQuery.matches) {
      return 0;
    }

    return 10;
  }

  getOverlayWidth(): number|string {
    if (this.mobileQuery.matches) {
      return '100%';
    }

    return 360;
  }

  getConnectedOverlayPanelClasses(): string[] {
    if (this.mobileQuery.matches) {
      return ['fixed', '!bottom-0', '!left-0', '!right-0'];
    }

    return [];
  }
}
