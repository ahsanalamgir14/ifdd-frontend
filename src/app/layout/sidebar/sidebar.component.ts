import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { SDG_IDS, SDGS_COLOR_CLASSES, SDG_IDS_COLORS_MAPPING } from 'src/app/core/constants';
import { Org } from 'src/app/orgs/org';

import { OrgService } from 'src/app/orgs/org.service';
import { OrgsSdg as OrgSdg } from 'src/app/orgs/orgs-sdg';
import { Target } from 'src/app/orgs/target';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent implements OnDestroy, OnInit {
  private _mobileQueryListener: () => void;
  private _open = false;
  mobileQuery: MediaQueryList;
  orgsBySdg: OrgSdg[] = [];
  selectedOrgSdg: OrgSdg | null = null;
  selectedTargets: Target[] = [];
  orgs: Org[] = [];
  showOrgs: boolean = false;
  loading = false;
  sdgsIdsMapping = SDG_IDS_COLORS_MAPPING;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private orgService: OrgService) {
    this.mobileQuery = media.matchMedia('(max-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.getOrgsBySdg();
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeEventListener('change', this._mobileQueryListener);
  }

  onSelectSdg(orgSdg: OrgSdg): void {
    this.selectedOrgSdg = orgSdg;
  }

  selectedOrgsCount(): number {
    if (this.selectedOrgSdg) {
      return this.selectedOrgSdg.orgsCount;
    }

    let count = 0;
    this.orgsBySdg.forEach(orgSdg => count += orgSdg.orgsCount);

    return count;
  }

  reinitialize(): void {
    this.selectedOrgSdg = null;
  }

  isOpen(): boolean {
    if (this.mobileQuery.matches) {
      return this._open;
    }

    return true;
  }

  toggle() {
    this._open = !this._open;
  }

  onShowOrgs(): void {
    this.showOrgs = true;
    this.getOrgs();
  }

  hideOrgs(): void {
    this.showOrgs = false;
  }

  onTargetsSelection(targets: Target[]): void {
    console.log(targets);
    this.selectedTargets = targets;
  }

  unselectTarget(position: number) {
    this.selectedTargets.splice(position, 1);
  }

  getTargetColorClass(target: Target): string {
    const id: string = target.id.split('.')[0];

    return this.sdgsIdsMapping[id];
  }

  private getOrgs(): void {
    this.loading = true;
    this.orgService.getOrgs()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(data => {
        this.orgs = data;
      });
  }

  private getOrgsBySdg(): void {
    this.loading = true;
    this.orgService.getOrgsBySdg()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(data => {
        this.orgsBySdg = data;
      });
  }
}
