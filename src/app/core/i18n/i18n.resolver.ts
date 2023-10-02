import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { I18nService } from './i18n.service';

@Injectable({
  providedIn: 'root',
})
export class I18nResolver implements Resolve<boolean> {
  constructor(private i18n: I18nService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.i18n.init();
  }
}
