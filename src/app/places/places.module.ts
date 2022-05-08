import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    SearchBarComponent,
  ],
  exports: [
    SearchBarComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class PlacesModule { }
