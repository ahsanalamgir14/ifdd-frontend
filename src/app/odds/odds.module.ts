import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OddComponent } from './odd/odd.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { OddCategoryComponent } from './odd-category/odd-category.component';



@NgModule({
  declarations: [
    OddComponent,
    OddCategoryComponent
  ],
  exports: [
    OddComponent,
    OddCategoryComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule
  ]
})
export class OddsModule { }
