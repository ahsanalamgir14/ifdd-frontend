import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-odd-category',
  templateUrl: './odd-category.component.html'
})
export class OddCategoryComponent {
  @Input() category!: Category;
  @Input() color?: string = '#ffffff';
  @Input() unselectable: boolean = true;
  @Output() unselectCategory: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  onUnselect(): void {
    this.unselectCategory.emit(true);
  }
}
