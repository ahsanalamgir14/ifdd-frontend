import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OddComponent } from './odd/odd.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    OddComponent
  ],
  exports: [
    OddComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule
  ]
})
export class OddsModule { }
