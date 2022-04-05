import { Component, OnInit } from '@angular/core';
import { LayerGroup, Map, View } from '../ol';

var view = new View({
  center: [0, 0],
  zoom: 0,
  minZoom: 4,
});

export const map = new Map({
  layers: [
    new LayerGroup({
      //@ts-ignore
      nom: 'group-layer-shadow',
    }),
  ],
  view: view,
});

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    map.setTarget('map');
    map.updateSize();
  }

}
