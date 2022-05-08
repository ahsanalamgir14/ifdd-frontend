import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
import { MapService } from './map/map.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  refreshCount = 0;
  constructor(private auth: AuthService, private mapService: MapService) {}

  ngOnInit() {
    this.auth.initSession();
    this.mapService.refreshed.subscribe(() => this.refreshCount++)
  }
}
