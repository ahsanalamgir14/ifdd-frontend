import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Feature, Map, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
import { Extent } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { Projection } from 'ol/proj';
import OSM from 'ol/source/OSM';
import Source from 'ol/source/Source';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import { Point } from 'ol/geom';
import { MapService } from '../map.service';

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
    private cd: ChangeDetectorRef,
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
        this.mapService.getVectorLayer()
      ],
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });
    const modifier = this.mapService.getModifier();
    const target = document.getElementById('map');
    if (target) {
      modifier.getOverlay().getSource().on(['addfeature', 'removefeature'], (event: any) => {
        target.style.cursor = event.type === 'addfeature' ? 'pointer' : '';
      });
    }

    this.map.addInteraction(modifier);
  }
}
