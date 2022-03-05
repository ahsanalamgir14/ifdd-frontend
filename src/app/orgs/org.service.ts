import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { OrgsSdg } from './orgs-sdg';
import { Sdg } from './sdg';

@Injectable({
  providedIn: 'root'
})
export class OrgService {

  constructor(private http: HttpClient) { }

  getOrgsBySdg(): Observable<OrgsSdg[]> {
    return this.http.get<OrgsSdg[]>('assets/data/orgs-grouped-by-sdg.json')
      .pipe(
        map(data => data.map((item: any) => {
          const sdg = new Sdg(item.sdg.id, item.sdg.name);
          return new OrgsSdg(sdg, item.orgsCount);
        }))
      );
  }
}
