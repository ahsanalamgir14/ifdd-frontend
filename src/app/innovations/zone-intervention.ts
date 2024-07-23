export class ZoneIntervention {
  public id?: number;
  public innovation_id?: number;
  public name: string;
  public longitude: string;
  public latitude: string;

  constructor(id: number, innovation_id: number, name: string, longitude: string, latitude: string) {
    this.id = id;
    this.innovation_id = innovation_id;
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;
  }
}
