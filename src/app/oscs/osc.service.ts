import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Osc } from './osc';

@Injectable({
  providedIn: 'root'
})
export class OscService {
  private url = '/osc';

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Osc> {
    return this.http.get<Osc>(`${this.url}/${id}`).pipe(
      map((response: any) => new Osc(response.data))
    )
  }

  getAll(): Observable<Osc[]> {
    return this.http.get<Osc[]>(this.url).pipe(
      map((response: any) => response.data.map((data: any) => new Osc(data)))
    );
  }
}
