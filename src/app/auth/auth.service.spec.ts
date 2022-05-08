import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { StorageService } from '../core/storage/storage.service';
import { User } from '../users/user';
import { UserService } from '../users/user.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let user = new User(1, 'Test', 'test@example.com', 2);

  beforeEach(() => {
    const userServiceMock = jasmine.createSpyObj('UserService', ['getMe']);

    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        StorageService,
        {
          provide: UserService,
          useValue: userServiceMock
        }
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    userServiceSpy.getMe.and.returnValue(of(user));
  });

  it('should authenticate', () => {
    const testData = {
      data: {
        token: 'token',
      }
    };

    service.authenticate('test@example.com', 'password').subscribe((token: string) => {
      expect(token).toBe('token');
    });

    const req = httpTestingController.expectOne('/auth/login');
    expect(req.request.method).toEqual('POST');

    req.flush(testData);
    httpTestingController.verify();
  });

  it('should not be authenticated', () => {
    expect(service.isAuthenticated()).toBeFalsy();
  });

  it('should login and logout', () => {
    service.login('token');

    expect(service.isAuthenticated()).toBeTruthy();

    service.logout().subscribe(() => {
      service.clearSession();
    });

    const req = httpTestingController.expectOne('/auth/logout');
    expect(req.request.method).toEqual('GET');

    req.flush({});
    httpTestingController.verify();
  });

  it('should init user session', () => {
    service.login('token');
    const response = {
      success: true,
      data: {
        user: {
          id: 2,
          name: 'Tester',
          email: 'test@sogefi.cm',
          email_verified_at: '2022-04-04T08:53:31.000000Z',
          role: 2,
          deleted_at: null,
          created_at: '2022-04-04T08:52:53.000000Z',
          updated_at: '2022-04-04T08:53:31.000000Z'
        }
      },
      message: 'Utilisateur'
    };

    service.initSession();
    service.logout().subscribe(() => {
      service.clearSession();
      expect(service.isAuthenticated()).toBeFalsy();
    });
    const req = httpTestingController.expectOne('/auth/logout');

    expect(req.request.method).toEqual('GET');
    expect(userServiceSpy.getMe).toHaveBeenCalled();

    req.flush(response);
    httpTestingController.verify();
  });

  it('should register a user', () => {
    const testData = {
      data: {
        token: 'token',
      }
    };

    service.register('Tester', 'test@example.com', 'password').subscribe((token: string) => {
      expect(token).toBe('token');
    });

    const req = httpTestingController.expectOne('/auth/register');
    expect(req.request.method).toEqual('POST');

    req.flush(testData);
    httpTestingController.verify();
  });

  it('should send the reset password link', () => {
    const testData = {
      data: ''
    };

    service.sendResetPassword('test@example.com').subscribe(() => {});

    const req = httpTestingController.expectOne('/auth/password/forgot');
    expect(req.request.method).toEqual('POST');

    req.flush(testData);
    httpTestingController.verify();
  });

  it('should send the password of a user', () => {
    const testData = {
      data: ''
    };

    service.resetPassword({
      email: 'test@test.com',
      token: 'token',
      password: 'test',
      password_confirmation: 'test'
    }).subscribe(() => {});

    const req = httpTestingController.expectOne('/auth/password/reset');
    expect(req.request.method).toEqual('POST');

    req.flush(testData);
    httpTestingController.verify();
  });
});
