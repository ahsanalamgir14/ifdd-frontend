import { Extent } from "ol/interaction";
import { Osc } from "../oscs/osc";

export class MapLocation {
  public id?: number;
  public type?: string;
  public osc?: Osc;

  public constructor(public name: string, public longitude: number, public latitude: number, public bbox: any) {}
}
