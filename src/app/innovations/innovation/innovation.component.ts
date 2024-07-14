import { Component, Input } from '@angular/core';
import { Innovation } from '../innovation';

@Component({
  selector: 'app-innovation',
  templateUrl: './innovation.component.html'
})
export class InnovationComponent {
  @Input() innovation!: Innovation;
  @Input() selected: boolean = false;

  constructor() { }
}
