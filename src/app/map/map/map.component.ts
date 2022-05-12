import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { Feature, Map, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
import { boundingExtent, Extent } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { Projection } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { MapService } from '../map.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from 'src/app/auth/auth.service';
import { ResetZoomControl } from '../reset-zoom-control';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html'
})
export class MapComponent implements AfterViewInit {
  private _mobileQueryListener: () => void;
  @Input() center: Coordinate = [17.7578122, 11.5024338];
  @Input() zoom: number = 1;
  @Output() mapReady: EventEmitter<Map> = new EventEmitter<Map>();
  @Output() mapHidden: EventEmitter<boolean> = new EventEmitter<boolean>();
  view?: View;
  projection: Projection|null = null;
  extent: Extent = [-7.2421878, -13.4975662, 42.7578122, 36.5024338];
  map?: Map;
  mobileQuery: MediaQueryList;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private mapService: MapService,
    private auth: AuthService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngAfterViewInit(): void {
    if (! this.map) {
      this.initMap();
    }

    setTimeout(() => {
      this.mapReady.emit(this.map);
      if (this.map) {
        this.mapService.setMap(this.map);
      }
    });
  }

  private initMap(): void {
    this.view = new View({
      center: this.center,
      zoom: this.zoom,
    });
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM({})
        }),
        this.mapService.getMarkerLayer(),
        this.mapService.getClusterLayer()
      ],
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([
        new ScaleLine({}),
        new ResetZoomControl({})
      ]),
    });

    this.map.on('click', (event: any) => {
      const features = this.map?.getFeaturesAtPixel(event.pixel);
      if (features && features.length > 0) {
        const feature = features[0] as Feature;
        this.mapService.select(feature);
      }

      this.mapService.getClusterLayer().getFeatures(event.pixel).then((clickedFeatures) => {
        if (clickedFeatures.length) {
          // Get clustered Coordinates
          const features = clickedFeatures[0].get('features');
          if (features.length > 1) {
            const extent = boundingExtent(
              features.map((r: any) => r.getGeometry().getCoordinates())
            );
            this.map?.getView().fit(extent, {duration: 1000, padding: [50, 50, 50, 50]});
          }
        }
      });
    });

    this.map.on("pointermove", (evt) => {
      if (this.map) {
        var hit = this.map.forEachFeatureAtPixel(evt.pixel, (feature, layer) => {
          return true;
        });
        if (hit) {
            this.map.getTargetElement().style.cursor = 'pointer';
        } else {
            this.map.getTargetElement().style.cursor = '';
        }
      }
    });
  }

  hideMap(): void {
    this.mapService.hide();
  }

  hasMarkers(): boolean {
    return this.mapService.hasMarkers();
  }
}
