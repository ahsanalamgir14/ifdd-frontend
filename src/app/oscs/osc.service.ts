import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../odds/category';
import { Osc } from './osc';

@Injectable({
  providedIn: 'root'
})
export class OscService {
  private url = '/osc';
  private searchUrl = '/search/osc';

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

  create(data: any): Observable<Osc> {
    return this.http.post<Osc>(this.url, JSON.stringify(data)).pipe(
      map((response: any) => new Osc(response.data))
    );
  }

  search(categories: Category[] = []): Observable<Osc[]> {
    const categoriesIds = categories.map((category: Category) => category.id);
    const body = {
      idsCategorieOdd: categoriesIds.join(',')
    }
    return this.http.post<Osc[]>(this.searchUrl, body).pipe(
      map((response: any) => response.data.map((data: any) => new Osc(data)))
    );
  }

  count(): Observable<number> {
    return this.http.get<number>(`/count/osc`).pipe(
      map((response: any) => response.data)
    );
  }
}
