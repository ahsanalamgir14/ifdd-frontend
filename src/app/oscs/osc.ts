import { Category } from '../odds/category';
import { Odd } from '../odds/odd';
import { ZoneIntervention } from './zone-intervention';

export class Osc {
  public id?: number;
  public name?: string;
  public abbreviation?: string;
  public numero_osc?: string;
  public country?: string;
  public date_fondation?: string;
  public description?: string;
  public personne_contact?: string;
  public telephone?: string;
  public email_osc?: string;
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
  public categorieOdds: Category[] = [];
  public zoneInterventions: ZoneIntervention[] = [];
  public oddIds: Set<number> = new Set<number>();

  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.abbreviation = data.abbreviation;
      this.numero_osc = data.numero_osc;
      this.country = data.country;
      this.date_fondation = data.date_fondation;
      this.description = data.description;
      this.personne_contact = data.personne_contact;
      this.telephone = data.telephone;
      this.email_osc = data.email_osc;
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

      if (data.categorie_odds) {
        this.categorieOdds = data.categorie_odds.map((category: any) => {
          this.oddIds.add(category.id_odd);
          const cat = new Category(
            category.id,
            category.category_number,
            category.name_en,
            category.intitule,
            category.id_odd,
            new Odd(
              category.odd.id,
              category.odd.name,
              category.odd.name_en,
              category.odd.number,
              category.odd.categorie_number,
              category.odd.logo_odd,
              category.odd.color
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
              zone.osc_id,
              zone.name,
              zone.longitude,
              zone.latitude
            )
        );
      }
    }
  }
}
