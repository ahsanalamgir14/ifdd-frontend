import { Component, Input } from '@angular/core';
import { Osc } from '../osc';

@Component({
  selector: 'app-osc',
  templateUrl: './osc.component.html'
})
export class OscComponent {
  @Input() osc!: Osc;
  @Input() selected: boolean = false;

  constructor() { }
}
