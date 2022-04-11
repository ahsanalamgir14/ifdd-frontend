import { Component, Input } from "@angular/core";
import { OrgsSdg } from "../orgs-sdg";

@Component({
  selector: 'app-org-sdg',
  template: 'org sdg works!'
})
export class OrgSdgStubComponent {
  @Input() orgSdg: OrgsSdg|null = null;
  @Input() selected = false;
  @Input() lite = false;
}
