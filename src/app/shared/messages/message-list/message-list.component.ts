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
      next: (message: Message) => this.messages.push(message)
    });
  }

  onRemove(index: number) {
    this.messages.splice(index, 1);
  }
}
