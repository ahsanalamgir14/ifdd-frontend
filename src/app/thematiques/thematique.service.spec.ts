import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Thematique } from './thematique';

import { ThematiqueService } from './thematique.service';

describe('ThematiqueService', () => {
  let service: ThematiqueService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });

    service = TestBed.inject(ThematiqueService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should get a single THEMATIQUE', () => {
    const response = {
      "success": true,
      "data": {
        "id": 1,
        "name": "PAS DE PAUVRETE",
        "number": "1",
        "count_innovation": 7,
        "logo_thematique": "https://service.geo.sm/var/www/thematique/thematique1.png",
        "color": "#ea1b2c",
        "categorie_thematique": [
          {
              "id": 1,
              "category_number": "1.1",
              "intitule": "Éliminer l'extrême pauvreté",
              "id_thematique": 1
          },
          {
              "id": 2,
              "category_number": "1.2",
              "intitule": "Réduire la pauvreté d'au moins 50%",
              "id_thematique": 1
          }
        ]
      }
    };
    service.get(1).subscribe((thematique: Thematique|null) => {
      expect(thematique?.id).toEqual(1);
      expect(thematique?.name).toEqual('PAS DE PAUVRETE');
      expect(thematique?.count_innovation).toEqual(7);
      expect(thematique?.logo_thematique).toEqual('https://service.geo.sm/var/www/thematique/thematique1.png');
      expect(thematique?.color).toEqual('#ea1b2c');
      expect(thematique?.categories.length).toEqual(2);
    });

    const req = httpTestingController.expectOne('/thematique/1');
    expect(req.request.method).toEqual('GET');
    req.flush(response);
  });

  it('should get the list of THEMATIQUEs', () => {
    const response = {
      "success": true,
      "data": [
        {
          "id": 1,
          "name": "PAS DE PAUVRETE",
          "number": "1",
          "count_innovation": 7,
          "logo_thematique": "https://service.geo.sm/var/www/thematique/thematique1.png",
          "color": "#ea1b2c"
        },
        {
          "id": 2,
            "name": "FAIM \"ZERO\"",
            "number": "2",
            "count_innovation": 8,
            "logo_thematique": "https://service.geo.sm/var/www/thematique/thematique2.png",
            "color": "#d3a029"
        }
      ]
    };

    service.getAll().subscribe((thematiques: Thematique[]) => {
      expect(thematiques.length).toEqual(2);
      expect(thematiques[0].id).toEqual(1);
      expect(thematiques[0].name).toEqual('PAS DE PAUVRETE');
      expect(thematiques[0].count_innovation).toEqual(7);
      expect(thematiques[0].logo_thematique).toEqual('https://service.geo.sm/var/www/thematique/thematique1.png');
      expect(thematiques[0].color).toEqual('#ea1b2c');
    });

    const req = httpTestingController.expectOne('/thematique');
    expect(req.request.method).toEqual('GET');

    req.flush(response);
    httpTestingController.verify();
  });
});
