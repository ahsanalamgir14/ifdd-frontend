import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MapStubComponent } from 'src/app/map/testing';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

import { BaseLayoutComponent } from './base-layout.component';

@Component({
  selector: 'app-navbar',
  template: 'navbar works!',
})
export class NavbarStubComponent {}

@Component({
  selector: 'app-sidebar',
  template: 'sidebar works!',
})
export class SidebarStubComponent {
  @Input() oddNumber: string = '';
  @Input() oscId?: number;
}

describe('BaseLayoutComponent', () => {
  let component: BaseLayoutComponent;
  let fixture: ComponentFixture<BaseLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BaseLayoutComponent,
        NavbarStubComponent,
        SidebarStubComponent,
        MapStubComponent,
      ],
      imports: [RouterTestingModule, TranslateModule.forRoot()],
    }).compileComponents();
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
