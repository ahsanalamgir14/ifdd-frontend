import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SDG_IDS_COLORS_MAPPING } from 'src/app/core/constants';
import { Target } from '../target';

@Component({
  selector: 'app-org-target',
  templateUrl: './org-target.component.html'
})
export class OrgTargetComponent {
  @Input() target!: Target;
  @Input() unselectable: boolean = true;
  @Output() unselectTarget: EventEmitter<boolean> = new EventEmitter<boolean>();
  sdgsIdsMapping = SDG_IDS_COLORS_MAPPING;

  constructor() { }

  getTargetColorClass(): string {
    const id: string = this.target.id.split('.')[0];

    return this.sdgsIdsMapping[id];
  }

  onUnselect(): void {
    this.unselectTarget.emit(true);
  }
}
