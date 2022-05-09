import { Injectable } from '@angular/core';
import { Feature, Map as OlMap } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { fromLonLat } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import { Osc } from '../oscs/osc';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!: OlMap;
  private markerSource: VectorSource;
  private markerLayer: VectorLayer<VectorSource>;
  private markerOscMap: Map<string, Osc> = new Map();
  selected: Subject<Osc> = new Subject();
  refreshed: Subject<boolean> = new Subject<boolean>();
  hidden: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.markerSource = new VectorSource();
    this.markerLayer = new VectorLayer({
      source: this.markerSource
    });
  }

  getMarkerLayer(): VectorLayer<VectorSource> {
    return this.markerLayer;
  }

  getMarkerSource(): VectorSource {
    return this.markerSource;
  }

  addMarker(coordinate: Coordinate, osc: Osc): void {
    if (osc && osc.id) {
      const iconFeature = new Feature({
        name: osc.name,
        geometry: new Point(fromLonLat(coordinate)),
      });
      iconFeature.setStyle(this.getMarkerStyle(''));
      iconFeature.setId(osc.id);
      this.markerSource.addFeature(iconFeature);
      this.markerOscMap.set(osc.id.toString(), osc);
    }
  }

  removeMarkers(): void {
    this.markerSource.clear();
  }

  setMap(map: OlMap) {
    this.map = map;
  }

  private getMarkerStyle(type: string) {
    const markerStyle: Style = new Style({
      image: new Icon({
        src: '/assets/icons/map/marker-star.png',
      })
    });

    return markerStyle;
  }

  select(feature: Feature) {
    const id = feature.getId();
    this.getMarkerSource().forEachFeature((feature: Feature) => {
      let iconSrc = '/assets/icons/map/marker-star-active.png';
      if (feature.getId() !== id) {
        iconSrc = '/assets/icons/map/marker-star.png';
      }

      feature.setStyle(new Style({
        image: new Icon({
          src: iconSrc,
        })
      }));
    })
    if (id) {
      const osc = this.markerOscMap.get(id.toString());
      if (osc) {
        this.selected.next(osc);
      }
    }
  }

  refresh() {
    this.refreshed.next(true);
  }

  zoomToMarker(coordinate: Coordinate) {
    const zoom = this.map.getView().getZoom();
    const animation: any = {
      duration: 250,
      center: coordinate
    };

    if (zoom && zoom < 10) {
      animation.zoom = 10;
    }

    this.map.getView().animate(animation);
  }

  removeZoom(): void {
    this.map.getView().setZoom(1);
  }

  hide(): void {
    this.hidden.next(true);
  }

  show(): void {
    this.hidden.next(false);
  }

  hasMarkers(): boolean {
    return this.markerSource.getFeatures().length > 0;
  }
}
