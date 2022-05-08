import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Country } from './country';
import { MapLocation } from './map-location';
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

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('assets/data/data.json').pipe(
      map((data: any) => {
        const results: Country[] = [];
        data.forEach((item: any) => {
          results.push(new Country(item.name, item.dial_code, item.flag, item.alpha2.toUpperCase()));
        });

        return results;
      })
    )
  }

  searchPlaces(name: string): Observable<MapLocation[]> {
    let params = new HttpParams();
    params = params.set('q', name);
    params = params.set('format', 'geojson');
    params = params.set('limit', 10);
    return this.http.get<MapLocation[]>(this.url, { params: params })
      .pipe(
        map((data: any) => {
          const results: MapLocation[] = [];
          data.features.forEach((item: any) => {
            results.push(new MapLocation(item.properties.display_name, item.geometry.coordinates[0], item.geometry.coordinates[1], item.bbox));
          });

          return results;
        })
      );
  }
}
