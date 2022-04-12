import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Org } from './org';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  constructor(private http: HttpClient) { }

  getOrgs(): Observable<Org[]> {
    return this.http.get<Org[]>('assets/data/orgs.json')
      .pipe(
        map(results => results.map((data: any) => {
          const org = new Org(data);
          return org;
        }))
      );
  }

  getOrg(id: number): Observable<Org|undefined> {
    return this.getOrgs()
      .pipe(
        map(results => results.find(org => org.id === id))
      );
  }
}
