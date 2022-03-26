import { Component, Input } from '@angular/core';
import { Org } from '../org';

@Component({
  selector: 'app-org',
  templateUrl: './org.component.html'
})
export class OrgComponent {
  @Input() org!: Org;
  constructor() { }
}
