export class Category {
  public id: number;
  public category_number: string;
  public intitule: string;
  public id_odd: number;

  constructor(
    id: number,
    category_number: string,
    intitule: string,
    id_odd: number
  ) {
    this.id = id;
    this.category_number = category_number;
    this.intitule = intitule;
    this.id_odd = id_odd;
  }
}
