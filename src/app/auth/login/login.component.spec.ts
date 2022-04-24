import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../auth.service';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['authenticate', 'login'])

    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        RouterTestingModule,
        SharedModule,
        TranslateModule.forRoot()
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
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
  });

  it('should login without errors', () => {
    authServiceSpy.authenticate.and.returnValue(of('token'));
    const emailInputEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const passwordInputEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const formElement = fixture.debugElement.query(By.css('form'));
    emailInputEl.value = 'test@example.com';
    passwordInputEl.value = 'password';
    emailInputEl.dispatchEvent(new Event('input'));
    passwordInputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    formElement.nativeElement.dispatchEvent(new Event('submit'));

    expect(authServiceSpy.authenticate).toHaveBeenCalledWith('test@example.com', 'password');
  });

  it('should not login', () => {
    const emailInputEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const passwordInputEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const formElement = fixture.debugElement.query(By.css('form'));
    emailInputEl.value = '';
    passwordInputEl.value = '';
    emailInputEl.dispatchEvent(new Event('input'));
    passwordInputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    formElement.nativeElement.dispatchEvent(new Event('submit'));

    expect(authServiceSpy.authenticate).not.toHaveBeenCalled();
  });

  it('should not login with login errors', () => {
    authServiceSpy.authenticate.and.returnValue(throwError(() => new HttpErrorResponse({status: 401})));
    const emailInputEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const passwordInputEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const formElement = fixture.debugElement.query(By.css('form'));
    emailInputEl.value = 'test';
    passwordInputEl.value = 'password';
    emailInputEl.dispatchEvent(new Event('input'));
    passwordInputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    formElement.nativeElement.dispatchEvent(new Event('submit'));

    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(component.hasLoginError).toBeTrue();
  });

  it('should not login with errors', () => {
    authServiceSpy.authenticate.and.returnValue(throwError(() => new Error('Not connected')));
    const emailInputEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const passwordInputEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;
    const formElement = fixture.debugElement.query(By.css('form'));
    emailInputEl.value = 'test';
    passwordInputEl.value = 'password';
    emailInputEl.dispatchEvent(new Event('input'));
    passwordInputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    formElement.nativeElement.dispatchEvent(new Event('submit'));

    expect(authServiceSpy.login).not.toHaveBeenCalled();
    expect(component.hasError).toBeTrue();
  });
});
