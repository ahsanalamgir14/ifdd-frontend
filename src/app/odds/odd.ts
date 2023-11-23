import { Category } from "./category";

export class Odd {
  public id: number;
  public name: string;
  public name_en: string;
  public number: string;
  public count_osc: number;
  public logo_odd: string;
  public color: string;
  public categories: Category[] = [];

  public constructor(
    id: number,
    name: string,
    name_en: string,
    number: string,
    count_osc: number,
    logo_odd: string,
    color: string
  ) {
    this.id = id;
    this.name = name;
    this.name_en = name_en;
    this.number = number;
    this.count_osc = count_osc;
    this.logo_odd = logo_odd;
    this.color = color;
  }
}
