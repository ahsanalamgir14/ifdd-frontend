import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { NavbarStubComponent } from '../base-layout/base-layout.component.spec';

import { PageLayoutComponent } from './page-layout.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

describe('PageLayoutComponent', () => {
  let component: PageLayoutComponent;
  let fixture: ComponentFixture<PageLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageLayoutComponent, NavbarStubComponent],
      imports: [RouterTestingModule, TranslateModule.forRoot(), OverlayModule],
      providers: [DialogService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
