import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OrgSdgComponent } from './org-sdg/org-sdg.component';
import { ActiveSdgsComponent } from './active-sdgs/active-sdgs.component';
import { OrgComponent } from './org/org.component';



@NgModule({
  declarations: [
    ActiveSdgsComponent,
    OrgSdgComponent,
    OrgComponent
  ],
  exports: [
    ActiveSdgsComponent,
    OrgSdgComponent,
    OrgComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OrgsModule { }
