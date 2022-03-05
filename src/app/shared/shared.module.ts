import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { HeroArrowRight, HeroChevronDown, HeroMenu, HeroSearch, HeroUserSolid, HeroX } from '@ng-icons/heroicons';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [],
  exports: [
    NgIconsModule,
    TranslateModule
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      HeroArrowRight,
      HeroChevronDown,
      HeroMenu,
      HeroSearch,
      HeroUserSolid,
      HeroX
    }),
    TranslateModule
  ]
})
export class SharedModule { }
