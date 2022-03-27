import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrgService } from '../org.service';

import { OrgDetailsComponent } from './org-details.component';

describe('OrgDetailsComponent', () => {
  let component: OrgDetailsComponent;
  let fixture: ComponentFixture<OrgDetailsComponent>;
  let orgServiceSpy: jasmine.SpyObj<OrgService>;

  beforeEach(async () => {
    const orgServiceMock = jasmine.createSpyObj('OrgService', ['getOrg']);

    await TestBed.configureTestingModule({
      declarations: [ OrgDetailsComponent ],
      providers: [ {provide: OrgService, useValue: orgServiceMock} ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgDetailsComponent);
    component = fixture.componentInstance;
    orgServiceSpy = TestBed.inject(OrgService) as jasmine.SpyObj<OrgService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
