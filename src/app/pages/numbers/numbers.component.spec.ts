import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { OddService } from 'src/app/odds/odd.service';
import { OscService } from 'src/app/oscs/osc.service';

import { NumbersComponent } from './numbers.component';

describe('NumbersComponent', () => {
  let component: NumbersComponent;
  let fixture: ComponentFixture<NumbersComponent>;
  let oddServiceSpy: jasmine.SpyObj<OddService>;
  let oscServiceSpy: jasmine.SpyObj<OscService>;

  beforeEach(async () => {
    const oddServiceMock = jasmine.createSpyObj('OddService', ['getAll']);
    const oscServiceMock = jasmine.createSpyObj('OscService', ['count']);

    await TestBed.configureTestingModule({
      declarations: [ NumbersComponent ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: OddService, useValue: oddServiceMock },
        { provide: OscService, useValue: oscServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersComponent);
    component = fixture.componentInstance;
    oddServiceSpy = TestBed.inject(OddService) as jasmine.SpyObj<OddService>;
    oscServiceSpy = TestBed.inject(OscService) as jasmine.SpyObj<OscService>;
    oddServiceSpy.getAll.and.returnValue(of([]));
    oscServiceSpy.count.and.returnValue(of(2));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
