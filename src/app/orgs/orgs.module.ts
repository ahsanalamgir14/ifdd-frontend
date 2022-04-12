import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ActiveSdgsComponent } from './active-sdgs/active-sdgs.component';
import { OrgComponent } from './org/org.component';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { OddsModule } from '../odds/odds.module';



@NgModule({
  declarations: [
    ActiveSdgsComponent,
    OrgComponent,
    OrgDetailsComponent,
  ],
  exports: [
    ActiveSdgsComponent,
    OrgComponent,
    OrgDetailsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    OddsModule
  ]
})
export class OrgsModule { }
