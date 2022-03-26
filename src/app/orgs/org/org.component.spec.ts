import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Org } from '../org';
import { Sdg } from '../sdg';

import { OrgComponent } from './org.component';

@Component({
  selector: 'app-active-sdgs',
  template: ''
})
export class ActiveSdgsStubComponent {
  @Input() orgSdgs: Sdg[] = [];
}

describe('OrgComponent', () => {
  let component: OrgComponent;
  let fixture: ComponentFixture<OrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgComponent, ActiveSdgsStubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgComponent);
    component = fixture.componentInstance;
    component.org = new Org({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
