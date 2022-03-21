import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { PlaceService } from './place.service';

describe('PlaceService', () => {
  let service: PlaceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(PlaceService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 2 places', () => {
    service.getPlaces('cotonou').subscribe((places: any[]) => {
      expect(places.length).toBe(2);
    });

    const req = httpTestingController.expectOne('assets/data/places.json')
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        "name": "Cotonou, Bénin",
        "type": "region"
      },
      {
        "name": "Yaounde, Cameroon",
        "type": "ville"
      },
      {
        "name": "Cotonou jeunesse",
        "type": "siège d'organization"
      },
      {
        "name":"Douala, Cameroon",
        "type": "zone d'intervention"
      }
    ]);

    httpTestingController.verify();
  });
});
