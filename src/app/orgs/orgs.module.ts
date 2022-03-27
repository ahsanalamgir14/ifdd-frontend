import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OrgSdgComponent } from './org-sdg/org-sdg.component';
import { ActiveSdgsComponent } from './active-sdgs/active-sdgs.component';
import { OrgComponent } from './org/org.component';
import { OrgDetailsComponent } from './org-details/org-details.component';
import { OrgTargetComponent } from './org-target/org-target.component';



@NgModule({
  declarations: [
    ActiveSdgsComponent,
    OrgSdgComponent,
    OrgComponent,
    OrgDetailsComponent,
    OrgTargetComponent
  ],
  exports: [
    ActiveSdgsComponent,
    OrgSdgComponent,
    OrgComponent,
    OrgDetailsComponent,
    OrgTargetComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OrgsModule { }
