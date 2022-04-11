import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpBaseUrlInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('http') || request.url.indexOf('/assets/i18n/') !== -1 || request.url.indexOf('assets/data/') !== -1) {
      return next.handle(request);
    }

    const url = `${environment.apiRoot}${request.url}`;

    return next.handle(request.clone({url}));
  }
}
