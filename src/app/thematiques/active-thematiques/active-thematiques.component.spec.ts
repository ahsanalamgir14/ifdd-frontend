import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ThematiqueService } from '../thematique.service';

import { ActiveThematiquesComponent } from './active-thematiques.component';

describe('ActiveThematiquesComponent', () => {
  let component: ActiveThematiquesComponent;
  let fixture: ComponentFixture<ActiveThematiquesComponent>;
  let thematiqueServiceSpy: jasmine.SpyObj<ThematiqueService>;

  beforeEach(async () => {
    const thematiqueServiceMock = jasmine.createSpyObj('ThematiqueService', ['getColors']);

    await TestBed.configureTestingModule({
      declarations: [ ActiveThematiquesComponent ],
      providers: [
        {
          provide: ThematiqueService,
          useValue: thematiqueServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveThematiquesComponent);
    component = fixture.componentInstance;
    thematiqueServiceSpy = TestBed.inject(ThematiqueService) as jasmine.SpyObj<ThematiqueService>;
    thematiqueServiceSpy.getColors.and.returnValue({test: '#fff'});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
