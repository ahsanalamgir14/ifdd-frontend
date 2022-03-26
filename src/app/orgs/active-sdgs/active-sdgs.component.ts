import { Component, Input, OnInit } from '@angular/core';
import { SDG_IDS_COLORS_MAPPING, SDG_IDS } from 'src/app/core/constants';
import { Sdg } from '../sdg';

@Component({
  selector: 'app-active-sdgs',
  templateUrl: './active-sdgs.component.html'
})
export class ActiveSdgsComponent {
  @Input() orgSdgs: Sdg[] = [];
  sdgIds: number[] = SDG_IDS;
  sdgCssClassesMapping = SDG_IDS_COLORS_MAPPING;

  constructor() {}

  isActive(sdgId: number): boolean {
    return this.orgSdgs.find((sdg: Sdg) => sdg.id === sdgId) !== undefined;
  }

  getCssClass(sdgId: number): string {
    if (this.isActive(sdgId)) {
      return this.sdgCssClassesMapping[`${sdgId}`];
    }

    return 'bg-secondary-light'
  }
}
