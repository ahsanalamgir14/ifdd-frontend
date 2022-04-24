import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { User } from './user';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return the current authenticated user', () => {
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

    service.getMe().subscribe((user: User) => {
      expect(user.id).toBe(2);
      expect(user.email).toBe('test@sogefi.cm');
      expect(user.name).toBe('Tester');
      expect(user.role).toBe(2);
    });

    const req = httpTestingController.expectOne('/user/me')
    expect(req.request.method).toBe('GET');

    req.flush(response);
    httpTestingController.verify();
  });
});
