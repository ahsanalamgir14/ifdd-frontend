import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './auth/auth.service';

describe('AppComponent', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    const authServiceMock = jasmine.createSpyObj('AuthService', ['initSession']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authServiceMock
        }
      ]
    }).compileComponents();

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    authServiceSpy.initSession.and.returnValue();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(app).toBeTruthy();
  });
});
