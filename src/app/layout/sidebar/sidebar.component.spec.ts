import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { of } from 'rxjs';
import { Odd } from 'src/app/odds/odd';
import { OddService } from 'src/app/odds/odd.service';
import { OddStubComponent } from 'src/app/odds/testing';
import { Osc } from 'src/app/oscs/osc';
import { OscService } from 'src/app/oscs/osc.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchBarStubComponent } from '../testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let oddServiceSpy: jasmine.SpyObj<OddService>;
  let oscServiceSpy: jasmine.SpyObj<OscService>;
  const odds: Odd[] = [
    new Odd(1, 'Pas de pauvreté', '1', 12, 'https://logo.com', '#ef9493'),
    new Odd(2, 'Faim zéro', '2', 12, 'https://logo.com', '#ef9493'),
  ];
  const oscs: Osc[] = [
    new Osc({}),
    new Osc({})
  ]

  beforeEach(async () => {
    const oddServiceMock = jasmine.createSpyObj('OddService', ['getAll']);
    const oscServiceMock = jasmine.createSpyObj('OscService', ['getAll']);

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
        },
        {
          provide: OscService,
          useValue: oscServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    oddServiceSpy = TestBed.inject(OddService) as jasmine.SpyObj<OddService>;
    oscServiceSpy = TestBed.inject(OscService) as jasmine.SpyObj<OscService>;
    oddServiceSpy.getAll.and.returnValue(of(odds));
    oscServiceSpy.getAll.and.returnValue(of(oscs));
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
