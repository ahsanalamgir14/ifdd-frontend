export class ZoneIntervention {
  public id?: number;
  public osc_id?: number;
  public name: string;
  public longitude: string;
  public latitude: string;

  constructor(id: number, osc_id: number, name: string, longitude: string, latitude: string) {
    this.id = id;
    this.osc_id = osc_id;
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;
  }
}
