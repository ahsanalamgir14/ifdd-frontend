import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { of } from 'rxjs';
import { Odd } from 'src/app/odds/odd';
import { OddService } from 'src/app/odds/odd.service';
import { OddStubComponent } from 'src/app/odds/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchBarStubComponent } from '../testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let oddServiceSpy: jasmine.SpyObj<OddService>;
  const odds: Odd[] = [
    new Odd(1, 'Pas de pauvreté', 12, 'https://logo.com', '#ef9493'),
    new Odd(2, 'Faim zéro', 12, 'https://logo.com', '#ef9493'),
  ];

  beforeEach(async () => {
    const oddServiceMock = jasmine.createSpyObj('OddService', ['getOdds']);

    await TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        OddStubComponent,
        SearchBarStubComponent,
      ],
      imports: [
        NgScrollbarModule,
        TranslateModule.forRoot(),
        SharedModule
      ],
      providers: [
        {
          provide: OddService,
          useValue: oddServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    oddServiceSpy = TestBed.inject(OddService) as jasmine.SpyObj<OddService>;
    oddServiceSpy.getOdds.and.returnValue(of(odds));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select an SDG', () => {
    const sdgEl = fixture.debugElement.query(By.css('app-odd'));
    sdgEl.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.selectedOdd).toBe(odds[0]);
  });

  it('should reinitialize the selection', () => {
    component.reinitialize();

    expect(component.selectedOdd).toBeNull();
  });

  it('should toggle the sidebar', () => {
    component.toggle();
    fixture.detectChanges();

    expect(component.isOpen()).toBe(true);
  });

  it('should always return component._open when mobileQuery.matches', () => {
    // TODO: mock this
    component.mobileQuery = {
      matches: true,
      addEventListener: () => {},
      removeEventListener: () => {},
      media: '',
      onchange: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: (event: Event) => true
    };

    expect(component.isOpen()).toEqual(false);
  });
});
