import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../odds/category';
import { Osc } from './osc';
import { Results } from './results';

const PAGE_LIMIT = 50;

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

  getAll(url?: string): Observable<Results<Osc>> {
    let params = new HttpParams();
    params = params.set('per_page', PAGE_LIMIT);
    url = url || this.url;
    return this.http.get<Results<Osc>>(url, { params }).pipe(
      map((response: any) => {
        const results = new Results<Osc>();

        results.data = response.data.data.map((data: any) => new Osc(data));
        results.next = response.data.next_page_url;
        results.previous = response.data.prev_page_url;
        results.total = response.data.total;

        return results;
      })
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

  searchByName(name: string): Observable<Osc[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('q', name);

    return this.http.get<Osc[]>(`/searchosc`, { params }).pipe(
      map((response: any) => response.data.map((data: any) => new Osc(data)))
    );
  }

  count(): Observable<number> {
    return this.http.get<number>(`/count/osc`).pipe(
      map((response: any) => response.data)
    );
  }
}
