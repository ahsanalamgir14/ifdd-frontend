import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { of, throwError } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../auth.service';

import { ForgotPasswordComponent } from './forgot-password.component';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const mockAuthService = jasmine.createSpyObj('AuthService', ['sendResetPassword']);

    await TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      imports: [ SharedModule, TranslateModule.forRoot() ],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    fixture.detectChanges();
  });

  it('should send reset link', () => {
    authServiceSpy.sendResetPassword.and.returnValue(of(''));
    const emailInputEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const formElement = fixture.debugElement.query(By.css('form'));
    emailInputEl.value = 'test@test.com';
    emailInputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    formElement.nativeElement.dispatchEvent(new Event('submit'));

    expect(authServiceSpy.sendResetPassword).toHaveBeenCalledWith('test@test.com');
  });

  it('should not send reset link', () => {
    component.completed = false;
    const emailInputEl: HTMLInputElement = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
    const formElement = fixture.debugElement.query(By.css('form'));
    emailInputEl.value = 'test';
    emailInputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    formElement.nativeElement.dispatchEvent(new Event('submit'));

    expect(authServiceSpy.sendResetPassword).not.toHaveBeenCalled();
  });
});
