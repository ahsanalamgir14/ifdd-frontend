import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OscComponent } from './osc/osc.component';
import { OddsModule } from '../odds/odds.module';
import { OscDetailsComponent } from './osc-details/osc-details.component';
import { SharedModule } from '../shared/shared.module';
import { OscFormComponent } from './osc-form/osc-form.component';
import { PlacesModule } from '../places/places.module';


@NgModule({
  declarations: [
    OscComponent,
    OscDetailsComponent,
    OscFormComponent
  ],
  exports: [
    OscComponent,
    OscDetailsComponent,
    OscFormComponent
  ],
  imports: [
    CommonModule,
    OddsModule,
    SharedModule,
    PlacesModule,
  ]
})
export class OscsModule { }
