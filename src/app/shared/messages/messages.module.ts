import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageListComponent } from './message-list/message-list.component';
import { MessageComponent } from './message/message.component';
import { IconsModule } from '../icons/icons.module';



@NgModule({
  declarations: [
    MessageListComponent,
    MessageComponent
  ],
  exports: [
    MessageListComponent,
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class MessagesModule { }
