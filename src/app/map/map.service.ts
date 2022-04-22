import { Injectable } from '@angular/core';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { transform } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';
import {Modify} from 'ol/interaction';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private markerSource: VectorSource;
  private markerLayer: VectorLayer<VectorSource>;
  private modifier: Modify;

  constructor() {
    this.markerSource = new VectorSource();
    this.markerLayer = new VectorLayer({
      source: this.markerSource
    });

    this.modifier = new Modify({
      hitDetection: this.markerLayer,
      source: this.markerSource
    });
  }

  getVectorLayer(): VectorLayer<VectorSource> {
    return this.markerLayer;
  }

  getMarkerSource(): VectorSource {
    return this.markerSource;
  }

  getModifier(): Modify {
    return this.modifier;
  }

  addMarker(coordinate: Coordinate, type: string): void {
    const iconFeature = new Feature({
      geometry: new Point(transform(coordinate, 'EPSG:4326', 'EPSG:3857'))
    });
    iconFeature.setStyle(this.getMarkerStyle(type));

    this.markerSource.addFeature(iconFeature);
  }

  removeMarkers(): void {
    this.markerSource.clear();
  }

  private getMarkerStyle(type: string) {
    const markerStyle: Style = new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        opacity: 0.75,
        src: '/assets/icons/map/marker-star.png',
      })
    });

    return markerStyle;
  }
}
