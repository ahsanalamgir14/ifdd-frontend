import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Target } from './target';

@Injectable({
  providedIn: 'root'
})
export class TargetService {

  constructor(private http: HttpClient) { }

  getTargetsForSdg(sdgId: number): Observable<Target[]> {
    return this.http.get<Target[]>('assets/data/targets-grouped-by-sdg.json')
      .pipe(
        map((data: any) => {
          const results: Target[] = [];
          data.forEach((item: any) => {
            if (item.sdgId === sdgId) {
              item.targets.forEach((target: any) => {
                results.push(new Target(target.id, target.title));
              });
            }
          });
          return results;
        })
      );
  }
}
