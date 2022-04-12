import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OddService } from './odd.service';

describe('OddService', () => {
  let service: OddService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(OddService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
