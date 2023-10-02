import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsComponent } from './terms.component';
import { DialogRef } from '../dialog/dialog-ref';
import { TranslateModule } from '@ngx-translate/core';

describe('TermsComponent', () => {
  let component: TermsComponent;
  let fixture: ComponentFixture<TermsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateModule.forRoot()],
      declarations: [TermsComponent],
      providers: [{ provide: DialogRef, useValue: { close: () => true } }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
