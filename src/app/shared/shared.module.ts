import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgIconsModule } from '@ng-icons/core';
import {
  HeroArrowRight,
  HeroCheck,
  HeroChevronDown,
  HeroChevronUp,
  HeroGlobeAlt,
  HeroInformationCircleSolid,
  HeroLocationMarkerSolid,
  HeroMailSolid,
  HeroMenu,
  HeroPhoneSolid,
  HeroPlus,
  HeroSearch,
  HeroUserSolid,
  HeroX
} from '@ng-icons/heroicons';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingLinesComponent } from './loading-lines/loading-lines.component';
import { DialogModule } from './dialog/dialog.module';
import { StepperComponent } from './stepper/stepper.component';
import { MenuComponent } from './menu/menu/menu.component';
import { MenuTriggerForDirective } from './menu/menu-trigger-for.directive';


@NgModule({
  declarations: [
    LoadingLinesComponent,
    MenuComponent,
    MenuTriggerForDirective,
    StepperComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule,
    TranslateModule,
    OverlayModule,
    NgScrollbarModule,
    MenuComponent,
    MenuTriggerForDirective,
    DialogModule,
    LoadingLinesComponent,
    StepperComponent
  ],
  imports: [
    OverlayModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgIconsModule.withIcons({
      HeroArrowRight,
      HeroCheck,
      HeroChevronDown,
      HeroChevronUp,
      HeroGlobeAlt,
      HeroInformationCircleSolid,
      HeroLocationMarkerSolid,
      HeroMailSolid,
      HeroMenu,
      HeroPhoneSolid,
      HeroPlus,
      HeroSearch,
      HeroUserSolid,
      HeroX
    }),
    TranslateModule,
    NgScrollbarModule,
    DialogModule
  ]
})
export class SharedModule { }
