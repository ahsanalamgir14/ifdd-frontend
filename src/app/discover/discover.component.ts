import { Component, OnDestroy, OnInit } from '@angular/core';
import { MapService } from '../map/map.service';
import { Osc } from '../oscs/osc';
import { OscService } from '../oscs/osc.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html'
})
export class DiscoverComponent implements OnDestroy, OnInit {

  constructor(private mapService: MapService, private oscService: OscService) { }

  ngOnInit(): void {
    this.oscService.getAll().subscribe((oscs: Osc[]) => {
      oscs.forEach((osc: Osc) => {
        if (osc.longitude && osc.latitude) {
          const longitude = Number.parseFloat(osc.longitude);
          const latitude = Number.parseFloat(osc.latitude);
          const coordinates = [longitude, latitude]
          this.mapService.addMarker(coordinates, osc);
        }
      });
    });
  }

  ngOnDestroy(): void {
    this.mapService.removeMarkers();
  }
}
