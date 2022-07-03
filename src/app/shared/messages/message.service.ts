import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Subject<Message> = new Subject<Message>();

  addMessage(type: string, title: string, description?: string, duration: number = 15000) {
    this.messages.next(new Message(type, title, description, duration));
  }
}
