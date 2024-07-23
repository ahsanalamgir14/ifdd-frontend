import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../category';

@Component({
  selector: 'app-thematique-category',
  templateUrl: './thematique-category.component.html'
})
export class ThematiqueCategoryComponent {
  @Input() category!: Category;
  @Input() color?: string = '#ffffff';
  @Input() unselectable: boolean = true;
  @Output() unselectCategory: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  onUnselect(): void {
    this.unselectCategory.emit(true);
  }
}
