import { Odd } from "./odd";

export class Category {
  public id: number;
  public category_number: string;
  public intitule: string;
  public id_odd: number;
  public odd: Odd;
  public description?: string;

  constructor(
    id: number,
    category_number: string,
    intitule: string,
    id_odd: number,
    odd: Odd
  ) {
    this.id = id;
    this.category_number = category_number;
    this.intitule = intitule;
    this.id_odd = id_odd;
    this.odd = odd;
  }
}
