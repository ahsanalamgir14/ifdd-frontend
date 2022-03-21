import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Place } from './place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  constructor(private http: HttpClient) {}

  getPlaces(name: string): Observable<Place[]> {
    return this.http.get<Place[]>('assets/data/places.json')
      .pipe(
        map((data: any) => {
          const results: Place[] = [];
          data.forEach((item: any) => {
            if (item.name.toLowerCase().indexOf(name.toLowerCase()) > -1) {
              results.push(new Place(item.name, item.type));
            }
          });

          return results;
        })
      );
  }
}
