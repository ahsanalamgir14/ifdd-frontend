import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { HeroArrowRight, HeroChevronDown, HeroMenu, HeroSearch, HeroUserSolid, HeroX } from '@ng-icons/heroicons';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';


@NgModule({
  declarations: [],
  exports: [
    NgIconsModule,
    TranslateModule,
    OverlayModule,
    NgScrollbarModule
  ],
  imports: [
    OverlayModule,
    CommonModule,
    NgIconsModule.withIcons({
      HeroArrowRight,
      HeroChevronDown,
      HeroMenu,
      HeroSearch,
      HeroUserSolid,
      HeroX
    }),
    TranslateModule,
    NgScrollbarModule
  ]
})
export class SharedModule { }
