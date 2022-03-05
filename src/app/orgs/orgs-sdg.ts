import { Sdg } from "./sdg";

export class OrgsSdg {
  public sdg: Sdg;
  public orgsCount: number;

  constructor(sdg: Sdg, orgsCount: number) {
    this.sdg = sdg;
    this.orgsCount = orgsCount;
  }
}
