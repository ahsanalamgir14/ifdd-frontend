import { Category } from "./category";

export class Odd {
  public id: number;
  public name: string;
  public number: string;
  public number_categorie: number;
  public logo_odd: string;
  public color: string;
  public categories: Category[] = [];

  public constructor(
    id: number,
    name: string,
    number: string,
    number_categorie: number,
    logo_odd: string,
    color: string
  ) {
    this.id = id;
    this.name = name;
    this.number = number;
    this.number_categorie = number_categorie;
    this.logo_odd = logo_odd;
    this.color = color;
  }
}
