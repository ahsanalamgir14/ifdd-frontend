import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Odd } from './odd';

import { OddService } from './odd.service';

describe('OddService', () => {
  let service: OddService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.inject(OddService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get a single ODD', () => {
    const response = {
      "success": true,
      "data": {
        "id": 1,
        "name": "PAS DE PAUVRETE",
        "number": "1",
        "number_categorie": 7,
        "logo_odd": "https://service.geo.sm/var/www/odd/odd1.png",
        "color": "#ea1b2c",
        "categorie_odd": [
          {
              "id": 1,
              "category_number": "1.1",
              "intitule": "Éliminer l'extrême pauvreté",
              "id_odd": 1
          },
          {
              "id": 2,
              "category_number": "1.2",
              "intitule": "Réduire la pauvreté d'au moins 50%",
              "id_odd": 1
          }
        ]
      }
    };
    service.get(1).subscribe((odd: Odd|null) => {
      expect(odd?.id).toEqual(1);
      expect(odd?.name).toEqual('PAS DE PAUVRETE');
      expect(odd?.number_categorie).toEqual(7);
      expect(odd?.logo_odd).toEqual('https://service.geo.sm/var/www/odd/odd1.png');
      expect(odd?.color).toEqual('#ea1b2c');
      expect(odd?.categories.length).toEqual(2);
    });

    const req = httpTestingController.expectOne('/odd/1');
    expect(req.request.method).toEqual('GET');
    req.flush(response);
  });

  it('should get the list of ODDs', () => {
    const response = {
      "success": true,
      "data": [
        {
          "id": 1,
          "name": "PAS DE PAUVRETE",
          "number": "1",
          "number_categorie": 7,
          "logo_odd": "https://service.geo.sm/var/www/odd/odd1.png",
          "color": "#ea1b2c"
        },
        {
          "id": 2,
            "name": "FAIM \"ZERO\"",
            "number": "2",
            "number_categorie": 8,
            "logo_odd": "https://service.geo.sm/var/www/odd/odd2.png",
            "color": "#d3a029"
        }
      ]
    };

    service.getAll().subscribe((odds: Odd[]) => {
      expect(odds.length).toEqual(2);
      expect(odds[0].id).toEqual(1);
      expect(odds[0].name).toEqual('PAS DE PAUVRETE');
      expect(odds[0].number_categorie).toEqual(7);
      expect(odds[0].logo_odd).toEqual('https://service.geo.sm/var/www/odd/odd1.png');
      expect(odds[0].color).toEqual('#ea1b2c');
    });

    const req = httpTestingController.expectOne('/odd');
    expect(req.request.method).toEqual('GET');

    req.flush(response);
    httpTestingController.verify();
  });
});
