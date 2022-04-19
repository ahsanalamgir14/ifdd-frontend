import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Place } from './place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private url = 'https://nominatim.openstreetmap.org/';

  constructor(private http: HttpClient) {}

  getPlaces(name: string): Observable<Place[]> {
    let params = new HttpParams();
    params = params.set('q', name);
    params = params.set('format', 'json');
    params = params.set('limit', 10);
    return this.http.get<Place[]>(this.url, { params: params })
      .pipe(
        map((data: any) => {
          const results: Place[] = [];
          data.forEach((item: any) => {
            results.push(new Place(item.display_name, item.type));
          });

          return results;
        })
      );
  }
}
