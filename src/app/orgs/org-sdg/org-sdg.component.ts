import { Component, Input, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OrgsSdg } from '../orgs-sdg';
import { Target } from '../target';
import { TargetService } from '../target.service';

@Component({
  selector: 'app-org-sdg',
  templateUrl: './org-sdg.component.html',
  styleUrls: ['./org-sdg.component.scss']
})
export class OrgSdgComponent {
  @Input() orgSdg!: OrgsSdg;
  @Input() selected = false;
  showTargets: boolean = false;
  targets: Target[] = [];
  loading: boolean = false;

  constructor(private targetService: TargetService) { }

  toggleTargets(): void {
    this.showTargets = !this.showTargets;

    if (this.showTargets && !this.targets.length) {
      this.getTargets();
    }
  }

  getTargets(): void {
    this.loading = true;
    this.targetService.getTargetsForSdg(this.orgSdg.sdg.id)
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(targets => {
        this.targets = targets;
        console.log(this.targets);
      });
  }
}
