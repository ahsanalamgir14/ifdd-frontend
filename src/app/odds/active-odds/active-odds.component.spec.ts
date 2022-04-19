import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OddService } from '../odd.service';

import { ActiveOddsComponent } from './active-odds.component';

describe('ActiveOddsComponent', () => {
  let component: ActiveOddsComponent;
  let fixture: ComponentFixture<ActiveOddsComponent>;
  let oddServiceSpy: jasmine.SpyObj<OddService>;

  beforeEach(async () => {
    const oddServiceMock = jasmine.createSpyObj('OddService', ['getColors']);

    await TestBed.configureTestingModule({
      declarations: [ ActiveOddsComponent ],
      providers: [
        {
          provide: OddService,
          useValue: oddServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveOddsComponent);
    component = fixture.componentInstance;
    oddServiceSpy = TestBed.inject(OddService) as jasmine.SpyObj<OddService>;
    oddServiceSpy.getColors.and.returnValue({test: '#fff'});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
