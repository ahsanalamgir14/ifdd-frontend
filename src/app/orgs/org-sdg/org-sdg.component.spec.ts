import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgSdgComponent } from './org-sdg.component';

describe('OrgSdgComponent', () => {
  let component: OrgSdgComponent;
  let fixture: ComponentFixture<OrgSdgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgSdgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgSdgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
