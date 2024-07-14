import { Category } from "./category";

export class Thematique {
  public id: number;
  public name: string;
  public name_en: string;
  public number: string;
  public count_innovation: number;
  public logo_thematique: string;
  public color: string;
  public categories: Category[] = [];

  public constructor(
    id: number,
    name: string,
    name_en: string,
    number: string,
    count_innovation: number,
    logo_thematique: string,
    color: string
  ) {
    this.id = id;
    this.name = name;
    this.name_en = name_en;
    this.number = number;
    this.count_innovation = count_innovation;
    this.logo_thematique = logo_thematique;
    this.color = color;
  }
}
