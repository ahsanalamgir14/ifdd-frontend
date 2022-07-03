import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Message } from '../message';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html'
})
export class MessageComponent implements OnInit, OnDestroy {
  @Input() message!: Message;
  @Output() remove: EventEmitter<boolean> = new EventEmitter<boolean>();
  private timeout: any;

  typeCssClassesMap: any = {
    'success': 'bg-primary text-white',
    'error': 'bg-red-600 text-white'
  };

  ngOnInit(): void {
    if (this.message.duration) {
      this.timeout = setTimeout(() => {
        this.onRemove();
      }, this.message.duration);
    }
  }

  ngOnDestroy(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  getCssClasses(): string {
    if (this.message.type in this.typeCssClassesMap) {
      return this.typeCssClassesMap[this.message.type];
    }

    return '';
  }

  onRemove(): void {
    this.remove.emit(true);
  }
}
