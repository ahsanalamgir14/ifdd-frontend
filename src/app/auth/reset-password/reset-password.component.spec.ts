import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { findEl, setFieldValue } from 'src/testing/utils';
import { AuthService } from '../auth.service';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const mockAuthService = jasmine.createSpyObj('AuthService', ['resetPassword']);
    const route = {
      snapshot: {
        queryParamMap: new Map([['email', 'test@example.com'], ['token', 'token']])
      }
    };

    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordComponent ],
      imports: [ SharedModule, TranslateModule.forRoot() ],
      providers: [
        { provide: ActivatedRoute, useValue: route },
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should reset password', () => {
    authServiceSpy.resetPassword.and.returnValue(of(''));
    setFieldValue(fixture, 'password1', 'password');
    setFieldValue(fixture, 'password2', 'password');
    findEl(fixture, 'form').triggerEventHandler('submit', {});

    expect(authServiceSpy.resetPassword).toHaveBeenCalled();
  });

  it('should not send the reset password form', () => {
    findEl(fixture, 'form').triggerEventHandler('submit', {});

    expect(authServiceSpy.resetPassword).not.toHaveBeenCalled();
  });

  it('should send the reset password and handle error', () => {
    authServiceSpy.resetPassword.and.returnValue(throwError(() => new HttpErrorResponse({error: {message: 'An error occurred'} })));
    setFieldValue(fixture, 'password1', 'password');
    setFieldValue(fixture, 'password2', 'password');
    findEl(fixture, 'form').triggerEventHandler('submit', {});

    expect(authServiceSpy.resetPassword).toHaveBeenCalled();
    expect(component.errorMessage).toBe('An error occurred');
  });
});
