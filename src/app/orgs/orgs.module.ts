import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrgSdgComponent } from './org-sdg/org-sdg.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    OrgSdgComponent
  ],
  exports: [
    OrgSdgComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class OrgsModule { }
