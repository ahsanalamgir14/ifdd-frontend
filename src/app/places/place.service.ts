import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinate } from 'ol/coordinate';
import { map, Observable } from 'rxjs';
import { Country } from './country';
import { MapLocation } from './map-location';

const SUPPORTED_TYPES: string[] = [
  'city',
  'village',
  'administrative'
];

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  private url = 'https://nominatim.openstreetmap.org/';

  constructor(private http: HttpClient) {}

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
            const location = new MapLocation(item.properties.display_name, item.geometry.coordinates[0], item.geometry.coordinates[1], item.bbox);
            location.type = SUPPORTED_TYPES.includes(item.properties.type) ? item.properties.type : '';
            results.push(location);
          });

          return results;
        })
      );
  }

  reverse(coordinates: Coordinate): Observable<MapLocation|null> {
    let params = new HttpParams();
    params = params.set('lat', coordinates[1].toString());
    params = params.set('lon', coordinates[0].toString());
    params = params.set('format', 'geojson');
    return this.http.get<MapLocation|null>(`${this.url}/reverse`, { params: params }).pipe(
      map((data: any) => {
        if (data.features.length > 0) {
          return new MapLocation(data.features[0].properties.display_name, data.features[0].geometry.coordinates[0], data.features[0].geometry.coordinates[1], data.features[0].bbox);
        }

        return null;
      })
    )
  }
}
