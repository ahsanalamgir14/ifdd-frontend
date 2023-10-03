import { Injectable } from '@angular/core';
import { RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { I18nService } from './i18n.service';

@Injectable({
  providedIn: 'root',
})
export class I18nResolver {
  constructor(private i18n: I18nService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.i18n.init();
  }
}
