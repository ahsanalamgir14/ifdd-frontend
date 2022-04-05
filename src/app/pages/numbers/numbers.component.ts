import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs';
import { OrgService } from 'src/app/orgs/org.service';
import { OrgsSdg as OrgSdg } from 'src/app/orgs/orgs-sdg';

@Component({
  selector: 'app-numbers',
  templateUrl: './numbers.component.html'
})
export class NumbersComponent implements OnInit {
  numbers: any = {
    countriesCount: 2,
    sdgsCount: 17,
    organizationsCount: 551
  };
  orgsBySdg: OrgSdg[] = [];
  loading: boolean = false;
  selectedOrgSdg: OrgSdg | null = null;

  constructor(private orgService: OrgService) { }

  ngOnInit(): void {
    this.getOrgsBySdg();
  }

  onSelectSdg(orgSdg: OrgSdg): void {
    this.selectedOrgSdg = orgSdg;
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
