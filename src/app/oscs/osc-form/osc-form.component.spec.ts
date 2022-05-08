import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { OddService } from 'src/app/odds/odd.service';
import { PlaceService } from 'src/app/places/place.service';
import { DialogRef } from 'src/app/shared/dialog/dialog-ref';
import { DIALOG_DATA } from 'src/app/shared/dialog/dialog-tokens';
import { SharedModule } from 'src/app/shared/shared.module';
import { OscService } from '../osc.service';

import { OscFormComponent } from './osc-form.component';

describe('OscFormComponent', () => {
  let component: OscFormComponent;
  let fixture: ComponentFixture<OscFormComponent>;
  let dialogRefSpy: jasmine.SpyObj<DialogRef>;
  let placeService: jasmine.SpyObj<PlaceService>;
  let oddService: jasmine.SpyObj<OddService>;
  let oscService: jasmine.SpyObj<OscService>;

  beforeEach(async () => {
    const mockDialogRef = jasmine.createSpyObj('DialogRef', ['close']);
    const mockPlaceService = jasmine.createSpyObj('PlaceService', ['getCountries']);
    const mockOddService = jasmine.createSpyObj('OddService', ['getAll']);
    const mockOscService = jasmine.createSpyObj('OscService', ['create']);
    const dialogData = {
      data: {
        title: 'title',
      }
    }

    await TestBed.configureTestingModule({
      declarations: [ OscFormComponent ],
      imports: [
        SharedModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: DialogRef, useValue: mockDialogRef },
        { provide: PlaceService, useValue: mockPlaceService },
        { provide: OddService, useValue: mockOddService },
        { provide: OscService, useValue: mockOscService },
        { provide: DIALOG_DATA, useValue: dialogData }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OscFormComponent);
    component = fixture.componentInstance;
    dialogRefSpy = TestBed.inject(DialogRef) as jasmine.SpyObj<DialogRef>;
    placeService = TestBed.inject(PlaceService) as jasmine.SpyObj<PlaceService>;
    oddService = TestBed.inject(OddService) as jasmine.SpyObj<OddService>;
    oscService = TestBed.inject(OscService) as jasmine.SpyObj<OscService>;
    placeService.getCountries.and.returnValue(of([]))
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
