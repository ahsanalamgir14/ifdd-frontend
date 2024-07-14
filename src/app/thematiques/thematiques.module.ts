import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThematiqueComponent } from './thematique/thematique.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { ThematiqueCategoryComponent } from './thematique-category/thematique-category.component';
import { ActiveThematiquesComponent } from './active-thematiques/active-thematiques.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ThematiqueComponent,
    ThematiqueCategoryComponent,
    ActiveThematiquesComponent
  ],
  exports: [
    ThematiqueComponent,
    ThematiqueCategoryComponent,
    ActiveThematiquesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule,
    RouterModule
  ]
})
export class ThematiquesModule { }
