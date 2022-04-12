import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingLinesComponent } from './loading-lines.component';

describe('LoadingLinesComponent', () => {
  let component: LoadingLinesComponent;
  let fixture: ComponentFixture<LoadingLinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoadingLinesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingLinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
