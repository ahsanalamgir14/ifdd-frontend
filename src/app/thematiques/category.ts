import { Thematique } from "./thematique";

export class Category {
  public id: number;
  public category_number: string;
  public intitule: string;
  public name_en: string;
  public id_thematique: number;
  public thematique: Thematique;
  public description?: string;

  constructor(
    id: number,
    category_number: string,
    intitule: string,
    name_en: string,
    id_thematique: number,
    thematique: Thematique
  ) {
    this.id = id;
    this.category_number = category_number;
    this.intitule = intitule;
    this.name_en = name_en;
    this.id_thematique = id_thematique;
    this.thematique = thematique;
  }
}
