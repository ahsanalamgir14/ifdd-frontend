import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OscService } from './osc.service';

describe('OscService', () => {
  let service: OscService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(OscService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
