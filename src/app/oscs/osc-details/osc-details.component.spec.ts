import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { OddService } from 'src/app/odds/odd.service';
import { Osc } from '../osc';
import { OscService } from '../osc.service';

import { OscDetailsComponent } from './osc-details.component';

describe('OscDetailsComponent', () => {
  let component: OscDetailsComponent;
  let fixture: ComponentFixture<OscDetailsComponent>;
  let oddServiceSpy: jasmine.SpyObj<OddService>;
  let oscServiceSpy: jasmine.SpyObj<OscService>;
  const osc = new Osc({});

  beforeEach(async () => {
    const oddServiceMock = jasmine.createSpyObj('OddService', ['getColors']);
    const oscServiceMock = jasmine.createSpyObj('OscService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [ OscDetailsComponent ],
      providers: [
        {
          provide: OddService,
          useValue: oddServiceMock
        },
        {
          provide: OscService,
          useValue: oscServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OscDetailsComponent);
    component = fixture.componentInstance;
    oddServiceSpy = TestBed.inject(OddService) as jasmine.SpyObj<OddService>;
    oscServiceSpy = TestBed.inject(OscService) as jasmine.SpyObj<OscService>;
    oddServiceSpy.getColors.and.returnValue({});
    oscServiceSpy.get.and.returnValue(of(osc));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
