import { Extent } from "ol/interaction";

export class MapLocation {
  public constructor(public name: string, public longitude: number, public latitude: number, public bbox: any) {}
}
