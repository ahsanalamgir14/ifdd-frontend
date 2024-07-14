import { Category } from '../thematiques/category';
import { Thematique } from '../thematiques/thematique';
import { ZoneIntervention } from './zone-intervention';

export class Innovation {
  public id?: number;
  public name?: string;
  public abbreviation?: string;
  public numero_innovation?: string;
  public country?: string;
  public date_fondation?: string;
  public description?: string;
  public personne_contact?: string;
  public telephone?: string;
  public email_innovation?: string;
  public site_web?: string;
  public facebook?: string;
  public instagram?: string;
  public twitter?: string;
  public linkedin?: string;
  public longitude?: string;
  public latitude?: string;
  public siege?: string;
  public reference?: string;
  public active?: boolean;
  public categorieThematiques: Category[] = [];
  public zoneInterventions: ZoneIntervention[] = [];
  public thematiqueIds: Set<number> = new Set<number>();

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.abbreviation = data.abbreviation;
      this.numero_innovation = data.numero_innovation;
      this.country = data.country;
      this.date_fondation = data.date_fondation;
      this.description = data.description;
      this.personne_contact = data.personne_contact;
      this.telephone = data.telephone;
      this.email_innovation = data.email_innovation;
      this.site_web = data.site_web;
      this.facebook = data.facebook;
      this.instagram = data.instagram;
      this.linkedin = data.linkedin;
      this.longitude = data.longitude;
      this.twitter = data.twitter;
      this.latitude = data.latitude;
      this.siege = data.siege;
      this.reference = data.reference;
      this.active = data.active;

      if (data.categorie_thematiques) {
        this.categorieThematiques = data.categorie_thematiques.map((category: any) => {
          this.thematiqueIds.add(category.id_thematique);
          const cat = new Category(
            category.id,
            category.category_number,
            category.intitule,
            category.name_en,
            category.id_thematique,
            new Thematique(
              category.thematique.id,
              category.thematique.name,
              category.thematique.name_en,
              category.thematique.number,
              category.thematique.categorie_number,
              category.thematique.logo_thematique,
              category.thematique.color
            )
          );
          cat.description = category.pivot?.description;
          return cat;
        });
      }

      if (data.zone_interventions) {
        this.zoneInterventions = data.zone_interventions.map(
          (zone: any) =>
            new ZoneIntervention(
              zone.id,
              zone.innovation_id,
              zone.name,
              zone.longitude,
              zone.latitude
            )
        );
      }
    }
  }
}
