import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingLinesComponent } from './loading-lines/loading-lines.component';
import { DialogModule } from './dialog/dialog.module';
import { StepperComponent } from './stepper/stepper.component';
import { MenuComponent } from './menu/menu/menu.component';
import { MenuTriggerForDirective } from './menu/menu-trigger-for.directive';
import { TermsComponent } from './terms/terms.component';
import { MessagesModule } from './messages/messages.module';
import { IconsModule } from './icons/icons.module';


@NgModule({
  declarations: [
    LoadingLinesComponent,
    MenuComponent,
    MenuTriggerForDirective,
    StepperComponent,
    TermsComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    OverlayModule,
    ScrollingModule,
    NgScrollbarModule,
    MenuComponent,
    MenuTriggerForDirective,
    DialogModule,
    LoadingLinesComponent,
    StepperComponent,
    MessagesModule,
    IconsModule,
  ],
  imports: [
    OverlayModule,
    ScrollingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IconsModule,
    TranslateModule,
    NgScrollbarModule,
    DialogModule,
    MessagesModule,
  ]
})
export class SharedModule { }
