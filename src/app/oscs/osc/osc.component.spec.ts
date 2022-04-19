import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Odd } from 'src/app/odds/odd';
import { Osc } from '../osc';

import { OscComponent } from './osc.component';

@Component({
  selector: 'app-active-odds',
  template: 'active odds works!'
})
export class ActiveOddsStubComponent {
  @Input() ids: Set<number> = new Set<number>();
  @Input() selected: boolean = false;
}

describe('OscComponent', () => {
  let component: OscComponent;
  let fixture: ComponentFixture<OscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OscComponent, ActiveOddsStubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OscComponent);
    component = fixture.componentInstance;
    component.osc = new Osc({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
