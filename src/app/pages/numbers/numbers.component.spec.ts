import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ThematiqueService } from 'src/app/thematiques/thematique.service';
import { InnovationService } from 'src/app/innovations/innovation.service';

import { NumbersComponent } from './numbers.component';

describe('NumbersComponent', () => {
  let component: NumbersComponent;
  let fixture: ComponentFixture<NumbersComponent>;
  let thematiqueServiceSpy: jasmine.SpyObj<ThematiqueService>;
  let innovationServiceSpy: jasmine.SpyObj<InnovationService>;

  beforeEach(async () => {
    const thematiqueServiceMock = jasmine.createSpyObj('ThematiqueService', ['getAll']);
    const innovationServiceMock = jasmine.createSpyObj('InnovationService', ['count']);

    await TestBed.configureTestingModule({
      declarations: [ NumbersComponent ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: ThematiqueService, useValue: thematiqueServiceMock },
        { provide: InnovationService, useValue: innovationServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersComponent);
    component = fixture.componentInstance;
    thematiqueServiceSpy = TestBed.inject(ThematiqueService) as jasmine.SpyObj<ThematiqueService>;
    innovationServiceSpy = TestBed.inject(InnovationService) as jasmine.SpyObj<InnovationService>;
    thematiqueServiceSpy.getAll.and.returnValue(of([]));
    innovationServiceSpy.count.and.returnValue(of(2));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
