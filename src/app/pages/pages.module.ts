import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AboutComponent } from './about/about.component';
import { SharedModule } from '../shared/shared.module';
import { PartnersComponent } from './partners/partners.component';
import { NumbersComponent } from './numbers/numbers.component';
import { OddsModule } from '../odds/odds.module';


@NgModule({
  declarations: [
    AboutComponent,
    PartnersComponent,
    NumbersComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    OddsModule
  ]
})
export class PagesModule { }
