import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSdgsComponent } from './active-sdgs.component';

describe('ActiveSdgsComponent', () => {
  let component: ActiveSdgsComponent;
  let fixture: ComponentFixture<ActiveSdgsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveSdgsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSdgsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
