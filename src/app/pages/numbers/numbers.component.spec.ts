import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { OrgService } from 'src/app/orgs/org.service';

import { NumbersComponent } from './numbers.component';

describe('NumbersComponent', () => {
  let component: NumbersComponent;
  let fixture: ComponentFixture<NumbersComponent>;
  let orgServiceSpy: jasmine.SpyObj<OrgService>;

  beforeEach(async () => {
    const orgServiceMock = jasmine.createSpyObj('OrgService', ['getOrgsBySdg']);

    await TestBed.configureTestingModule({
      declarations: [ NumbersComponent ],
      imports: [
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: OrgService, useValue: orgServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NumbersComponent);
    component = fixture.componentInstance;
    orgServiceSpy = TestBed.inject(OrgService) as jasmine.SpyObj<OrgService>;
    orgServiceSpy.getOrgsBySdg.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
