import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OddComponent } from './odd/odd.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { OddCategoryComponent } from './odd-category/odd-category.component';
import { ActiveOddsComponent } from './active-odds/active-odds.component';



@NgModule({
  declarations: [
    OddComponent,
    OddCategoryComponent,
    ActiveOddsComponent
  ],
  exports: [
    OddComponent,
    OddCategoryComponent,
    ActiveOddsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule
  ]
})
export class OddsModule { }
