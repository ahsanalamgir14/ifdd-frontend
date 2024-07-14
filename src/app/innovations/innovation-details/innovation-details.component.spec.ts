import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ThematiqueService } from 'src/app/thematiques/thematique.service';
import { Innovation } from '../innovation';
import { InnovationService } from '../innovation.service';

import { InnovationDetailsComponent } from './innovation-details.component';

describe('InnovationDetailsComponent', () => {
  let component: InnovationDetailsComponent;
  let fixture: ComponentFixture<InnovationDetailsComponent>;
  let thematiqueServiceSpy: jasmine.SpyObj<ThematiqueService>;
  let innovationServiceSpy: jasmine.SpyObj<InnovationService>;
  const innovation = new Innovation({});

  beforeEach(async () => {
    const thematiqueServiceMock = jasmine.createSpyObj('ThematiqueService', ['getColors']);
    const innovationServiceMock = jasmine.createSpyObj('InnovationService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [ InnovationDetailsComponent ],
      providers: [
        {
          provide: ThematiqueService,
          useValue: thematiqueServiceMock
        },
        {
          provide: InnovationService,
          useValue: innovationServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationDetailsComponent);
    component = fixture.componentInstance;
    thematiqueServiceSpy = TestBed.inject(ThematiqueService) as jasmine.SpyObj<ThematiqueService>;
    innovationServiceSpy = TestBed.inject(InnovationService) as jasmine.SpyObj<InnovationService>;
    thematiqueServiceSpy.getColors.and.returnValue({});
    innovationServiceSpy.get.and.returnValue(of(innovation));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
