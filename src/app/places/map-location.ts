import { Extent } from "ol/interaction";
import { Innovation } from "../innovations/innovation";

export class MapLocation {
  public id?: number;
  public type?: string;
  public innovation?: Innovation;

  public constructor(public name: string, public longitude: number, public latitude: number, public bbox: any) {}
}
