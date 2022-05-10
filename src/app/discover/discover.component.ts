import { Component, OnDestroy } from '@angular/core';
import { MapService } from '../map/map.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html'
})
export class DiscoverComponent implements OnDestroy {

  constructor(private mapService: MapService) { }

  ngOnDestroy(): void {
    this.mapService.removeMarkers();
  }
}
