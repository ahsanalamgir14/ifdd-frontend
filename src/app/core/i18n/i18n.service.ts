import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from '../storage/storage.service';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { L } from '@angular/cdk/keycodes';

@Injectable({
  providedIn: 'root',
})
export class I18nService {
  constructor(
    private translate: TranslateService,
    private storage: StorageService
  ) {}

  init(): Observable<any> {
    let language = this.storage.getItem('language');
    if (!language) {
      if (location.hostname === 'cartodd.francophonie.org') {
        language = 'fr';
      } else {
        language = 'en';
      }
    }
    
    if (location.hostname === 'cartodd.francophonie.org') {
      this.translate.setDefaultLang('fr');
    } else {
      this.translate.setDefaultLang('en');
    }
    
    return this.changeLanguage(language);
  }

  changeLanguage(language: string, immediate = true): Observable<any> {
    this.storage.setItem('language', language);
    if (immediate) {
      return this.translate.use(language);
    } else {
      return of(true);
    }
  }

  instant(key: string | string[], interpolateParams?: Object | undefined): any {
    return this.translate.instant(key, interpolateParams);
  }

  getLanguage(): string {
    return this.translate.currentLang;
  }
}
