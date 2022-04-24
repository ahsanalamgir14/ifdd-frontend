import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { User } from 'src/app/users/user';
import { SearchBarStubComponent } from '../testing';

import { NavbarComponent } from './navbar.component';

@Component({
  selector: 'app-about',
  template: 'about works!'
})
export class AboutStubComponent { }

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let router: Router;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceMock = {
      user$: new Subject<User>(),
      isAuthenticated: jasmine.createSpy('isAuthenticated')
    }
    await TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        AboutStubComponent,
        SearchBarStubComponent
      ],
      imports: [
        TranslateModule.forRoot(),
        SharedModule,
        RouterTestingModule.withRoutes([{
          path: 'a-propos',
          component: AboutStubComponent
        }])
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the sidebar', () => {
    component.openSidebar();

    expect(component.sidebarVisible).toBeTrue();
  });

  it('should close the sidebar', () => {
    component.closeSidebar();

    expect(component.sidebarVisible).toBeFalse();
  });

  it('should update menu items active flag on navigation end', (done) => {
    router.navigate(['/a-propos']).then(() => {
      expect(component.menuItems[0].active).toBeFalse();
      expect(component.menuItems[1].active).toBeTrue();
      expect(component.menuItems[2].active).toBeFalse();
      expect(component.menuItems[3].active).toBeFalse();
      done();
    });
  });
});
