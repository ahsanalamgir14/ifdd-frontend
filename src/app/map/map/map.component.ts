import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, NgZone, Output } from '@angular/core';
import { Map, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { ScaleLine, defaults as DefaultControls} from 'ol/control';
import { Extent } from 'ol/extent';
import TileLayer from 'ol/layer/Tile';
import { Projection } from 'ol/proj';
import OSM from 'ol/source/OSM';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit {
  @Input() center: Coordinate = [0, 0];
  @Input() zoom: number = 2;
  @Output() mapReady = new EventEmitter<Map>();
  view?: View;
  projection: Projection|null = null;
  extent: Extent = [-20026376.39, -20048966.10, 20026376.39, 20048966.10];
  map?: Map;

  constructor(private zone: NgZone, private cd: ChangeDetectorRef) { }

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
      })],
      target: 'map',
      view: this.view,
      controls: DefaultControls().extend([
        new ScaleLine({}),
      ]),
    });
  }
}
