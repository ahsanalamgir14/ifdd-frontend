import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Category } from '../thematiques/category';
import { Innovation } from './innovation';
import { Results } from './results';

const PAGE_LIMIT = 50;

@Injectable({
  providedIn: 'root'
})
export class InnovationService {
  private url = '/innovation';
  private searchUrl = '/search/innovation';

  constructor(private http: HttpClient) { }

  get(id: number): Observable<Innovation> {
    return this.http.get<Innovation>(`${this.url}/${id}`).pipe(
      map((response: any) => new Innovation(response.data))
    )
  }

  getAll(url?: string): Observable<Results<Innovation>> {
    let params = new HttpParams();
    params = params.set('per_page', PAGE_LIMIT);
    url = url || this.url;
    return this.http.get<Results<Innovation>>(url, { params }).pipe(
      map((response: any) => {
        const results = new Results<Innovation>();

        results.data = response.data.data.map((data: any) => new Innovation(data));
        results.next = response.data.next_page_url;
        results.previous = response.data.prev_page_url;
        results.total = response.data.total;

        return results;
      })
    );
  }

  create(data: any): Observable<Innovation> {
    return this.http.post<Innovation>(this.url, JSON.stringify(data)).pipe(
      map((response: any) => new Innovation(response.data))
    );
  }

  search(categories: Category[] = []): Observable<Innovation[]> {
    const categoriesIds = categories.map((category: Category) => category.id);
    const body = {
      idsCategorieThematique: categoriesIds.join(',')
    }
    return this.http.post<Innovation[]>(this.searchUrl, body).pipe(
      map((response: any) => response.data.map((data: any) => new Innovation(data)))
    );
  }

  searchByName(name: string): Observable<Innovation[]> {
    let params: HttpParams = new HttpParams();
    params = params.set('q', name);

    return this.http.get<Innovation[]>(`/searchinnovation`, { params }).pipe(
      map((response: any) => response.data.map((data: any) => new Innovation(data)))
    );
  }

  count(): Observable<number> {
    return this.http.get<number>(`/count/innovation`).pipe(
      map((response: any) => response.data)
    );
  }
}
