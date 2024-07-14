import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Category } from './category';
import { Thematique } from './thematique';

@Injectable({
  providedIn: 'root'
})
export class ThematiqueService {
  private url = '/thematique';
  private thematiqueColors: any = {};

  constructor(public http: HttpClient) { }

  get(id: number): Observable<Thematique|null> {
    return this.http.get<Thematique>(`${this.url}/${id}`)
      .pipe(
        map((response: any) => {
          if (response && response.data) {
            const thematique = new Thematique(
              response.data.id,
              response.data.name,
              response.data.name_en,
              response.data.number,
              response.data.count_innovation,
              response.data.logo_thematique,
              response.data.color
            );

            thematique.categories = response.data.categorie_thematique.map(
              (item: any) => new Category(
                item.id,
                item.category_number,
                item.intitule,
                item.name_en,
                item.id_thematique,
                thematique
              )
            );

            return thematique;
          }

          return null;
        })
      );
  }

  getAll(): Observable<Thematique[]> {
    return this.http.get<Thematique[]>(this.url)
      .pipe(
        map((response: any) => {
          if (response && response.data) {
            return response.data.map((item: any) => {
              const thematique = new Thematique(
                item.id,
                item.name,
                item.name_en,
                item.number,
                item.count_innovation,
                item.logo_thematique,
                item.color
              );
              this.thematiqueColors[thematique.number] = thematique.color;
              return thematique;
            })
          }

          return [];
        })
      )
  }

  getColors(): any {
    return this.thematiqueColors;
  }
}
