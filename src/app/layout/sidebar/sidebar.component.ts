import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { Odd } from 'src/app/odds/odd';
import { OddService } from 'src/app/odds/odd.service';
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
  odds: Odd[] = [];
  selectedOdd: Odd | null = null;
  selectedTargets: Target[] = [];
  selectedOrg: Org | null = null;
  orgs: Org[] = [];
  showOrgs: boolean = false;
  loading = false;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private oddService: OddService
  ) {
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

  onSelectSdg(odd: Odd): void {
    this.selectedOdd = odd;
  }

  selectedOrgsCount(): number {
    if (this.selectedOdd) {
      return this.selectedOdd.number_categorie;
    }

    let count = 0;
    this.odds.forEach(odd => count += odd.number_categorie);

    return count;
  }

  reinitialize(): void {
    this.selectedOdd = null;
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
    // this.getOrgs();
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

  onSelectOrg(org: Org): void {
    this.selectedOrg = org;
  }

  onCloseOrgDetails(): void {
    this.selectedOrg = null;
  }

  // private getOrgs(): void {
  //   this.loading = true;
  //   this.orgService.getOrgs()
  //     .pipe(
  //       finalize(() => this.loading = false)
  //     )
  //     .subscribe(data => {
  //       this.orgs = data;
  //     });
  // }

  private getOrgsBySdg(): void {
    this.loading = true;
    this.oddService.getOdds()
      .pipe(
        finalize(() => this.loading = false)
      )
      .subscribe(data => {
        this.odds = data;
      });
  }
}
