import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '../shared/shared.module';
import { PartnersComponent } from './partners/partners.component';


@NgModule({
  declarations: [
    AboutComponent,
    PartnersComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule
  ]
})
export class PagesModule { }
