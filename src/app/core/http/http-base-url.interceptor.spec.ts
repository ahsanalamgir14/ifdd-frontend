import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';

import { HttpBaseUrlInterceptor } from './http-base-url.interceptor';

describe('HttpBaseUrlInterceptor', () => {
  let client: HttpClient;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpBaseUrlInterceptor,
          multi: true
        },
      ]
    });

    client = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should not modify URLs starting with http', () => {
    client.get('https://api.github.com/').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.url).toBe('https://api.github.com/');
  });

  it('should add API Root endpoint', () => {
    client.get('/thematiques').subscribe();
    const request = httpMock.match({method: 'get'})[0].request;

    expect(request.url).toBe(`${environment.apiRoot}/thematiques`);
  });
});
