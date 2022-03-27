import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Org } from '../org';
import { OrgService } from '../org.service';
import { Sdg } from '../sdg';
import { Target } from '../target';

@Component({
  selector: 'app-org-details',
  templateUrl: './org-details.component.html'
})
export class OrgDetailsComponent implements OnInit {
  @Input() set selectedOrg(org: Org) {
    this.org = org;
    this.getOrg();
  };
  @Output() hide: EventEmitter<boolean> = new EventEmitter<boolean>();
  org?: Org;
  targets: Target[] = [];

  constructor(private orgService: OrgService) { }

  ngOnInit(): void {
    this.getOrg();
  }

  getOrg(): void {
    if (this.org?.id) {
      console.log('called')
      this.orgService.getOrg(this.org.id).subscribe((org: Org|undefined) => {
        this.org = org;
        this.loadTargets();
      });
    }
  }

  loadTargets(): void {
    this.targets = [];
    if (this.org?.sdgs) {
      this.org.sdgs.forEach((sdg: Sdg) => {
        sdg.targets?.forEach((target: Target) => {
          this.targets.push(target);
        });
      });
    }
  }

  onHide(): void {
    this.hide.emit(true);
  }
}
