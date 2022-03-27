import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Target } from '../target';

import { OrgTargetComponent } from './org-target.component';

describe('OrgTargetComponent', () => {
  let component: OrgTargetComponent;
  let fixture: ComponentFixture<OrgTargetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgTargetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgTargetComponent);
    component = fixture.componentInstance;
    component.target = new Target('1.1', 'Target 1.1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
