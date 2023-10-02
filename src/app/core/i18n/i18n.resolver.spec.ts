import { TestBed } from '@angular/core/testing';

import { I18nResolver } from './i18n.resolver';
import { I18nService } from './i18n.service';
import { of } from 'rxjs';

describe('I18nResolver', () => {
  let resolver: I18nResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: I18nService,
          useValue: { init: () => of(true) },
        },
      ],
    });
    resolver = TestBed.inject(I18nResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
