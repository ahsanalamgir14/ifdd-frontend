import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Thematique } from 'src/app/thematiques/thematique';
import { Innovation } from '../innovation';

import { InnovationComponent } from './innovation.component';

@Component({
  selector: 'app-active-thematiques',
  template: 'active thematiques works!'
})
export class ActiveThematiquesStubComponent {
  @Input() ids: Set<number> = new Set<number>();
  @Input() selected: boolean = false;
}

describe('InnovationComponent', () => {
  let component: InnovationComponent;
  let fixture: ComponentFixture<InnovationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InnovationComponent, ActiveThematiquesStubComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InnovationComponent);
    component = fixture.componentInstance;
    component.innovation = new Innovation({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
