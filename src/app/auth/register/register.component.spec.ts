import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { findEl, setFieldValue } from 'src/testing/utils';
import { AuthService } from '../auth.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['register', 'login']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        SharedModule
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
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should register a new user', () => {
    authServiceSpy.register.and.returnValue(of('token'));
    setFieldValue(fixture, 'name', 'Tester');
    setFieldValue(fixture, 'email', 'test@example.com');
    setFieldValue(fixture, 'password1', 'password');
    setFieldValue(fixture, 'password2', 'password');
    findEl(fixture, 'register-form').triggerEventHandler('submit', {});

    expect(authServiceSpy.register).toHaveBeenCalledWith('Tester', 'test@example.com', 'password');
  });

  it('should not register a new user if form invalid', () => {
    authServiceSpy.register.and.returnValue(of('token'));
    setFieldValue(fixture, 'name', 'Tester');
    setFieldValue(fixture, 'email', 'test@example.com');
    setFieldValue(fixture, 'password1', 'password');
    setFieldValue(fixture, 'password2', 'password1');
    findEl(fixture, 'register-form').triggerEventHandler('submit', {});

    expect(component.form.valid).toBeFalse();
    expect(authServiceSpy.register).not.toHaveBeenCalled();
  });

  it('should not register a new user if server return error', () => {
    authServiceSpy.register.and.returnValue(throwError(() => new HttpErrorResponse({error: {data: {email: ['Already exists']}}})));
    setFieldValue(fixture, 'name', 'Tester');
    setFieldValue(fixture, 'email', 'test@example.com');
    setFieldValue(fixture, 'password1', 'password');
    setFieldValue(fixture, 'password2', 'password');
    findEl(fixture, 'register-form').triggerEventHandler('submit', {});

    expect(authServiceSpy.register).toHaveBeenCalledWith('Tester', 'test@example.com', 'password');
    expect(component.errors?.email[0]).toBe('Already exists');
  });
});
