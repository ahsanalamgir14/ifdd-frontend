import { Component } from '@angular/core';
import { Message } from '../message';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html'
})
export class MessageListComponent {
  messages: Message[] = [];

  constructor(private messageService: MessageService) {
    this.messageService.messages.subscribe({
      next: (newMessage: Message) => {
        for (let message of this.messages) {
          if (message.type === newMessage.type && message.description === newMessage.description && message.title === newMessage.title) {
            return;
          }
        }

        this.messages.push(newMessage);
      }
    });
  }

  onRemove(index: number) {
    this.messages.splice(index, 1);
  }
}
