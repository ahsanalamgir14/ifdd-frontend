import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { OddService } from 'src/app/odds/odd.service';

import { NumbersComponent } from './numbers.component';

describe('NumbersComponent', () => {
  let component: NumbersComponent;
  let fixture: ComponentFixture<NumbersComponent>;
  let oddServiceSpy: jasmine.SpyObj<OddService>;

  beforeEach(async () => {
    const oddServiceMock = jasmine.createSpyObj('OddService', ['getOdds']);

    await TestBed.configureTestingModule({
      declarations: [ NumbersComponent ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: OddService, useValue: oddServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersComponent);
    component = fixture.componentInstance;
    oddServiceSpy = TestBed.inject(OddService) as jasmine.SpyObj<OddService>;
    oddServiceSpy.getOdds.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
