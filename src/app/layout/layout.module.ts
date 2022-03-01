import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    BaseLayoutComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    SharedModule
  ]
})
export class LayoutModule { }
