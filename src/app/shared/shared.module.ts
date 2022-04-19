import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import {
  HeroArrowRight,
  HeroChevronDown,
  HeroChevronUp,
  HeroGlobeAlt,
  HeroLocationMarkerSolid,
  HeroMailSolid,
  HeroMenu,
  HeroPhoneSolid,
  HeroSearch,
  HeroUserSolid,
  HeroX
} from '@ng-icons/heroicons';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingLinesComponent } from './loading-lines/loading-lines.component';


@NgModule({
  declarations: [
    LoadingLinesComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule,
    TranslateModule,
    OverlayModule,
    NgScrollbarModule,
    LoadingLinesComponent,
  ],
  imports: [
    OverlayModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      HeroArrowRight,
      HeroChevronDown,
      HeroChevronUp,
      HeroGlobeAlt,
      HeroLocationMarkerSolid,
      HeroMailSolid,
      HeroMenu,
      HeroPhoneSolid,
      HeroSearch,
      HeroUserSolid,
      HeroX
    }),
    TranslateModule,
    NgScrollbarModule
  ]
})
export class SharedModule { }
