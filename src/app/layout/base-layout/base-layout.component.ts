import { ChangeDetectorRef, Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Coordinate } from 'ol/coordinate';
import { OscFormComponent } from 'src/app/oscs/osc-form/osc-form.component';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-base-layout',
  templateUrl: './base-layout.component.html'
})
export class BaseLayoutComponent {
  constructor(
    private changeDetector: ChangeDetectorRef,
    private i18n: TranslateService,
    private dialogService: DialogService
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
}
