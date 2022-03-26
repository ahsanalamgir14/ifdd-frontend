export class Contact {
  public name?: string;
  public website?: string;
  public emailAddress?: string;
  public phoneNumber?: string;
  public facebook?: string;
  public poBox?: string;

  constructor(data: any) {
    if (data) {
      this.name = data.name;
      this.website = data.website;
      this.emailAddress = data.emailAddress;
      this.phoneNumber = data.phoneNumber;
      this.facebook = data.facebook;
      this.poBox = data.poBox;
    }
  }
}
