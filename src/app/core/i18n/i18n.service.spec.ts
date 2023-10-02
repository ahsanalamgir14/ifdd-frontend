import { TestBed } from '@angular/core/testing';

import { I18nService } from './i18n.service';
import { TranslateModule } from '@ngx-translate/core';
import { StorageService } from '../storage/storage.service';

describe('I18nService', () => {
  let service: I18nService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      providers: [StorageService],
    });
    service = TestBed.inject(I18nService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
