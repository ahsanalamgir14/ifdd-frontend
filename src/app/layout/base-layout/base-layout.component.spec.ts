import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BaseLayoutComponent } from './base-layout.component';

@Component({
  selector: 'app-navbar',
  template: 'navbar works!'
})
export class NavbarStubComponent { }

@Component({
  selector: 'app-sidebar',
  template: 'sidebar works!'
})
export class SidebarStubComponent {}

describe('BaseLayoutComponent', () => {
  let component: BaseLayoutComponent;
  let fixture: ComponentFixture<BaseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BaseLayoutComponent,
        NavbarStubComponent,
        SidebarStubComponent
      ],
      imports: [ RouterTestingModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
