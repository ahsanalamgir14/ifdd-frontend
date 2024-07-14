import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { ThematiqueService } from 'src/app/thematiques/thematique.service';
import { PlaceService } from 'src/app/places/place.service';
import { DialogRef } from 'src/app/shared/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/shared/dialog/dialog-tokens';
import { SharedModule } from 'src/app/shared/shared.module';
import { InnovationService } from '../innovation.service';

import { InnovationFormComponent } from './innovation-form.component';

describe('InnovationFormComponent', () => {
  let component: InnovationFormComponent;
  let fixture: ComponentFixture<InnovationFormComponent>;
  let dialogRefSpy: jasmine.SpyObj<DialogRef>;
  let placeService: jasmine.SpyObj<PlaceService>;
  let thematiqueService: jasmine.SpyObj<ThematiqueService>;
  let innovationService: jasmine.SpyObj<InnovationService>;

  beforeEach(async () => {
    const mockDialogRef = jasmine.createSpyObj('DialogRef', ['close']);
    const mockPlaceService = jasmine.createSpyObj('PlaceService', ['getCountries']);
    const mockThematiqueService = jasmine.createSpyObj('ThematiqueService', ['getAll']);
    const mockInnovationService = jasmine.createSpyObj('InnovationService', ['create']);
    const dialogData = {
      data: {
        title: 'title',
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ InnovationFormComponent ],
      imports: [
        SharedModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: DialogRef, useValue: mockDialogRef },
        { provide: PlaceService, useValue: mockPlaceService },
        { provide: ThematiqueService, useValue: mockThematiqueService },
        { provide: InnovationService, useValue: mockInnovationService },
        { provide: DIALOG_DATA, useValue: dialogData }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationFormComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(DialogRef) as jasmine.SpyObj<DialogRef>;
    placeService = TestBed.inject(PlaceService) as jasmine.SpyObj<PlaceService>;
    thematiqueService = TestBed.inject(ThematiqueService) as jasmine.SpyObj<ThematiqueService>;
    innovationService = TestBed.inject(InnovationService) as jasmine.SpyObj<InnovationService>;
    placeService.getCountries.and.returnValue(of([]))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
