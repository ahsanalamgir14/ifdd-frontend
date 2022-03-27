import { Contact } from "./contact";
import { Sdg } from "./sdg";
import { Target } from "./target";

export class Org {
  public id?: number;
  public name?: string;
  public code?: string;
  public description?: string;
  public contact?: Contact;
  public presentation?: string;
  public organization?: string;
  public interventionZones?: string[] = [];
  public sdgs: Sdg[] = [];
  public similarOrgs: Org[] = [];

  constructor(data: any) {
    if(data) {
      this.id = data.id;
      this.name = data.name;
      this.code = data.code;
      this.description = data.description;
      this.presentation = data.presentation;
      this.organization = data.organization;
      this.interventionZones = data.interventionZones;

      if(data.contact) {
        this.contact = new Contact(data.contact);
      }

      if (data.sdgs) {
        this.sdgs = data.sdgs.map((sdgData: any) => {
          const sdg = new Sdg(sdgData.id, sdgData.name);
          sdg.targets = sdgData.targets?.map((target: any) => new Target(target.id, target.title));

          return sdg;
        });
      }

      if (data.similarOrgs) {
        this.similarOrgs = data.similarOrgs.map((orgData: any) => new Org(orgData));
      }
    }
  }


}
