
import { Injectable } from '@angular/core';
import { Feature, Map as OlMap } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector';
import { useGeographic } from 'ol/proj';
import VectorSource from 'ol/source/Vector';
import ClusterSource from 'ol/source/Cluster';
import Icon from 'ol/style/Icon';
import {
  Fill,
  Style,
  Text,
} from 'ol/style';
import { Osc } from '../oscs/osc';
import { Subject } from 'rxjs';
import { MapLocation } from '../places/map-location';

useGeographic();

@Injectable({
  providedIn: 'root'
})
export class MapService {
  private map!: OlMap;
  private markerSource: VectorSource;
  private markerLayer: VectorLayer<VectorSource>;
  private clusterSource: ClusterSource;
  private clusterLayer: VectorLayer<VectorSource>;
  private textSource: VectorSource;
  private textLayer: VectorLayer<VectorSource>;
  private markerOscMap: Map<string, Osc> = new Map();
  private _hasResults: boolean = false;
  private _hasSelected: boolean = false;
  selected: Subject<Osc> = new Subject();
  refreshed: Subject<boolean> = new Subject<boolean>();
  hidden: Subject<boolean> = new Subject<boolean>();

  constructor() {
    const styleCache: any = {};
    this.markerSource = new VectorSource();
    this.markerLayer = new VectorLayer({
      source: this.markerSource,
    });
    this.clusterSource = new ClusterSource({
      distance: 80,
      source: this.markerSource
    });
    this.textSource = new VectorSource();
    this.textLayer = new VectorLayer({
      source: this.textSource,
      visible: false
    });
    this.clusterLayer = new VectorLayer({
      source: this.clusterSource,
      style: (feature) => {
        const size = feature.get('features').length;
        let style = styleCache[size];
        if (!style) {
          style = new Style({
            image: new Icon({
              src: '/assets/icons/map/marker.png',
            }),
            text: new Text({
              text: size.toString(),
              fill: new Fill({
                color: '#255033',
              }),
              font: 'bold 14px sans-serif',
            }),
          });
          styleCache[size] = style;
        }
        return style;
      }
    });
  }

  getMarkerLayer(): VectorLayer<VectorSource> {
    return this.markerLayer;
  }

  getMarkerSource(): VectorSource {
    return this.markerSource;
  }

  getClusterLayer(): VectorLayer<VectorSource> {
    return this.clusterLayer;
  }

  getTextLayer(): VectorLayer<VectorSource> {
    return this.textLayer;
  }

  addMarker(coordinate: Coordinate, osc: Osc): void {
    if (osc && osc.id && !this.markerOscMap.has(osc.id.toString())) {
      const iconFeature = new Feature({
        name: osc.name,
        geometry: new Point(coordinate),
      });
      iconFeature.setStyle(this.getMarkerStyle());
      iconFeature.setId(osc.id);
      this.markerSource.addFeature(iconFeature);
      this.markerOscMap.set(osc.id.toString(), osc);

      if (osc.abbreviation) {
        const textFeature = new Feature({
          name: osc.abbreviation,
          geometry: new Point(coordinate)
        });
        textFeature.setStyle(this.getMarkerTextStyle(osc.abbreviation));
        textFeature.setId(`${osc.id}-text`);
        this.textSource.addFeature(textFeature);
      }
    }
  }

  removeMarkers(): void {
    this.markerSource.clear();
    this.clusterSource.clear();
    this.markerOscMap.clear();
    this.textSource.clear();
  }

  setMap(map: OlMap) {
    this.map = map;
    this.markerLayer.setMaxResolution(this.map?.getView().getResolutionForZoom(8));
    this.markerLayer.setMinResolution(this.map?.getView().getResolutionForZoom(20))
    this.clusterLayer.setMinResolution(this.map?.getView().getResolutionForZoom(8));
    this.clusterLayer.setMaxResolution(this.map?.getView().getResolutionForZoom(0));
  }

  private getMarkerStyle(): Style {
    const markerStyle: Style = new Style({
      image: new Icon({
        src: '/assets/icons/map/marker-star.png',
      })
    });

    return markerStyle;
  }

  private getMarkerTextStyle(text: string): Style {
    const markerTextStyle: Style = new Style({
      text: new Text({
        text,
        fill: new Fill({
          color: '#255033',
        }),
        font: 'bold 14px sans-serif',
        offsetY: -30,
        padding: [2, 5, 2, 5],
        backgroundFill: new Fill({
          color: '#fff'
        })
      })
    });

    return markerTextStyle;
  }

  selectById(id: number) {
    const feature = this.markerSource.getFeatureById(id)

    if (feature) {
      this.select(feature, false);
    }
  }

  select(feature: Feature, emit: boolean = true) {
    const id = feature.getId();
    let osc: Osc | undefined;
    if (id) {
      osc = this.markerOscMap.get(id.toString());
    }

    if (osc) {
      if (emit) {
        this.selected.next(osc);
      } else {
        if (osc?.longitude && osc.latitude) {
          this.zoomToMarker([Number.parseFloat(osc?.longitude), Number.parseFloat(osc?.latitude)])
        }
      }
    }

    this.updateMarkerStyle(feature, true);
    this.updateTextMarkerStyle(feature, true);

    this.markerSource.forEachFeature((otherFeature: Feature) => {
      if (otherFeature.getId() !== id) {
        this.updateMarkerStyle(otherFeature);
        this.updateTextMarkerStyle(otherFeature);
      }
    });

    if (osc) {
      if (emit) {
        this.selected.next(osc);
      } else {
        if (osc?.longitude && osc.latitude) {
          this.zoomToMarker([Number.parseFloat(osc?.longitude), Number.parseFloat(osc?.latitude)])
        }
      }
    }
  }

  private updateMarkerStyle(feature: Feature, selected: boolean = false): void {
    const id = feature.getId();
    let iconSrc = '/assets/icons/map/marker-star.png';
    let zIndex = 1;
    if (selected) {
      iconSrc = '/assets/icons/map/marker-star-active.png';
      zIndex = 2;
    }
    if (id && this.markerOscMap.has(id.toString())) {
      const style = feature.getStyle() as Style;
      style.setZIndex(zIndex);
      style.setImage(new Icon({ src: iconSrc }));
      feature.setStyle(style);
    }
  }

  private updateTextMarkerStyle(feature: Feature, selected: boolean = false) {
    let backgroundFill = '#fff';
    let fill = '#255033';
    let zIndex = 1;

    if (selected) {
      backgroundFill = '#255033';
      fill = '#fff';
      zIndex = 2;
    }

    const id = feature.getId();
    const textFeature = this.textSource.getFeatureById(`${id}-text`);
    const textStyle = textFeature?.getStyle() as Style;
    const text = textStyle?.getText();

    if (text) {
      text.setBackgroundFill(new Fill({ color: backgroundFill }));
      text.setFill(new Fill({ color: fill }));
      textStyle.setText(text);
      textStyle.setZIndex(zIndex);
      textFeature?.setStyle(textStyle);
    }
  }

  refresh() {
    this.refreshed.next(true);
  }

  zoomToMarker(coordinate: Coordinate) {
    const zoom = this.map.getView().getZoom();
    const animation: any = {
      duration: 800,
      center: coordinate
    };

    if (zoom && zoom < 10) {
      animation.zoom = 10;
    }

    this.map.getView().animate(animation);
  }

  removeZoom(): void {
    this.map?.getView()?.setZoom(1);
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

  setHasResults(hasResult: boolean): void {
    this._hasResults = hasResult;
  }

  hasResults(): boolean {
    return this._hasResults;
  }

  selectLocation(location: MapLocation|null): void {
    if (location) {
      if (location.id) {
        const feature = this.markerSource.getFeatureById(location.id)

        if (feature) {
          this.select(feature, true);
        }
      }
      this.zoomToMarker([location.longitude, location.latitude]);
    } else {
      this.removeZoom();
    }
  }

  setHasSelected(selected: boolean): void {
    this._hasSelected = selected;
  }

  hasSelected(): boolean {
    return this._hasSelected;
  }
}
