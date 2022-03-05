import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { OrgsModule } from '../orgs/orgs.module';



@NgModule({
  declarations: [
    BaseLayoutComponent,
    NavbarComponent,
    SearchBarComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SharedModule,
    NgScrollbarModule,
    OrgsModule
  ]
})
export class LayoutModule { }
