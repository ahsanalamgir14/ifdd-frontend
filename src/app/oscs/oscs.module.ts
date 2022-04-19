import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OscComponent } from './osc/osc.component';
import { OddsModule } from '../odds/odds.module';
import { OscDetailsComponent } from './osc-details/osc-details.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OscComponent,
    OscDetailsComponent
  ],
  exports: [
    OscComponent,
    OscDetailsComponent
  ],
  imports: [
    CommonModule,
    OddsModule,
    SharedModule
  ]
})
export class OscsModule { }
