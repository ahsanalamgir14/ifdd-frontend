import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { TargetService } from './target.service';

describe('TargetService', () => {
  let service: TargetService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(TargetService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 3 targets', () => {
    service.getTargetsForSdg(1).subscribe((targets: any[]) => {
      expect(targets.length).toBe(3);
    });

    const req = httpTestingController.expectOne('assets/data/targets-grouped-by-sdg.json');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        "sdgId": 1,
        "targets": [
          {
            "id": "1.1",
            "title": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ea dignissimos deleniti labore, vitae incidunt laboriosam nostrum fugiat adipisci, reprehenderit pariatur recusandae rerum ullam. Iusto non dolore, distinctio quo aliquid facere."
          },
          {
            "id": "1.2",
            "title": "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatem aliquam quidem, earum accusamus minima culpa dolorem modi rerum delectus laborum, harum magnam. Tempora cupiditate ut dolorem velit? Soluta, excepturi numquam!"
          },
          {
            "id": "1.3",
            "title": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla nesciunt, nemo totam adipisci, vitae ducimus placeat commodi doloremque corporis hic velit! Error similique alias voluptatem quod. Omnis exercitationem nemo dolore?"
          }
        ]
      }
    ]);
    httpTestingController.verify();
  });
});
