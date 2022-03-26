import { Target } from "./target";

export class Sdg {
  public id: number;
  public name: string;
  public targets?: Target[] = [];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}
