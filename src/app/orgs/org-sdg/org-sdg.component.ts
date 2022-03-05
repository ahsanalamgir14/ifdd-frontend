import { Component, Input, OnInit } from '@angular/core';
import { OrgsSdg } from '../orgs-sdg';

@Component({
  selector: 'app-org-sdg',
  templateUrl: './org-sdg.component.html',
  styleUrls: ['./org-sdg.component.scss']
})
export class OrgSdgComponent {
  @Input() orgSdg!: OrgsSdg;
  @Input() selected = false;

  constructor() { }
}
