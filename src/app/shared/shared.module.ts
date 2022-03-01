import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import { HeroArrowRight, HeroMenu, HeroUserSolid, HeroX } from '@ng-icons/heroicons';


@NgModule({
  declarations: [],
  exports: [
    NgIconsModule
  ],
  imports: [
    CommonModule,
    NgIconsModule.withIcons({
      HeroArrowRight,
      HeroMenu,
      HeroUserSolid,
      HeroX
    })
  ]
})
export class SharedModule { }
