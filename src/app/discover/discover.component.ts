import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Coordinate } from 'ol/coordinate';
import { MapService } from '../map/map.service';
import { OscFormComponent } from '../oscs/osc-form/osc-form.component';
import { DialogService } from '../shared/dialog/dialog.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html'
})
export class DiscoverComponent implements OnDestroy {

  constructor(
    private changeDetector: ChangeDetectorRef,
    private i18n: TranslateService,
    private dialogService: DialogService,
    private mapService: MapService
  ) { }

  onAdd(coordinate: Coordinate): void {
    this.dialogService.open(OscFormComponent, {
      data: {
        title: this.i18n.instant('title.register'),
        coordinate
      }
    }).afterClosed().subscribe(result => {});
    this.changeDetector.detectChanges();
  }

  ngOnDestroy(): void {
    this.mapService.removeMarkers();
  }
}
