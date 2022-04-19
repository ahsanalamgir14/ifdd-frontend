import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { PageLayoutComponent } from './page-layout/page-layout.component';
import { OddsModule } from '../odds/odds.module';
import { OscsModule } from '../oscs/oscs.module';
import { MapModule } from '../map/map.module';



@NgModule({
  declarations: [
    BaseLayoutComponent,
    NavbarComponent,
    SearchBarComponent,
    SidebarComponent,
    PageLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SharedModule,
    OddsModule,
    OscsModule,
    MapModule
  ]
})
export class LayoutModule { }
