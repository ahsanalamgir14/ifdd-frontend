import { TestBed } from '@angular/core/testing';

import { I18nResolver } from './i18n.resolver';

describe('I18nResolver', () => {
  let resolver: I18nResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(I18nResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
