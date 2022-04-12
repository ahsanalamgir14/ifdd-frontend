import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Odd } from './odd';

@Injectable({
  providedIn: 'root'
})
export class OddService {
  private url = '/odd';

  constructor(public http: HttpClient) { }

  getOdds(): Observable<Odd[]> {
    return this.http.get<Odd[]>(this.url)
      .pipe(
        map((response: any) => {
          if (response && response.data) {
            return response.data.map((item: any) => new Odd(
              item.id,
              item.name,
              item.number_categorie,
              item.logo_odd,
              item.color
            ));
          }

          return [];
        })
      )
  }
}
