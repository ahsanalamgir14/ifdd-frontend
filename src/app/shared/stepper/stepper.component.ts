import { Component, Input } from '@angular/core';
import { Step } from './step';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html'
})
export class StepperComponent {
  @Input() steps: Step[] = [];
  @Input() selected?: Step;

  constructor() { }

  isActive(step: Step): boolean {
    return this.selected?.position === step.position;
  }

  isLast(step: Step): boolean {
    return this.steps.indexOf(step) === this.steps.length - 1;
  }

  isPast(step: Step): boolean {
    if (this.selected) {
      return this.selected.position > step.position;
    }

    return false;
  }
}
