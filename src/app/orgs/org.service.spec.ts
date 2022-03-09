import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { OrgService } from './org.service';
import { OrgsSdg } from './orgs-sdg';

describe('OrgService', () => {
  let service: OrgService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(OrgService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 12 SDGs', () => {
    service.getOrgsBySdg().subscribe((orgsSdg: OrgsSdg[]) => {
      expect(orgsSdg.length).toEqual(2);
    });

    const req = httpTestingController.expectOne('assets/data/orgs-grouped-by-sdg.json');
    expect(req.request.method).toBe('GET');

    req.flush([
      {
        "sdg": {
          "id": 1,
          "name": "Pas de pauvreté"
        },
        "orgsCount": 12
      },
      {
        "sdg": {
          "id": 2,
          "name": "Faim \"zéro\""
        },
        "orgsCount": 32
      }
    ]);
    httpTestingController.verify();
  });
});
