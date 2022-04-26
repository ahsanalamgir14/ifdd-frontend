import { AfterViewInit, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Feature, Map, MapBrowserEvent, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
import { Extent } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { Projection } from 'ol/proj';
import OSM from 'ol/source/OSM';
import { MapService } from '../map.service';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import Icon from 'ol/style/Icon';
import {
  Style,
  Circle as CircleStyle,
  Fill,
  Stroke,
  Text
} from 'ol/style';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() center: Coordinate = [17.7578122, 11.5024338];
  @Input() zoom: number = 4;
  @Output() mapReady = new EventEmitter<Map>();
  view?: View;
  projection: Projection|null = null;
  extent: Extent = [-7.2421878, -13.4975662, 42.7578122, 36.5024338];
  map?: Map;

  constructor(
    private zone: NgZone,
    private mapService: MapService
  ) { }

  ngAfterViewInit(): void {
    if (! this.map) {
      this.zone.runOutsideAngular(() => this.initMap())
    }

    setTimeout(()=>this.mapReady.emit(this.map));
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
      ],
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });

    this.map.on('click', (event: any) => {
      const features = this.map?.getFeaturesAtPixel(event.pixel);
      if (features && features.length > 0) {
        const feature = features[0] as Feature;
        this.mapService.select(feature);
      }
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
}
