import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { of } from 'rxjs';
import { Thematique } from 'src/app/thematiques/thematique';
import { ThematiqueService } from 'src/app/thematiques/thematique.service';
import { ThematiqueStubComponent } from 'src/app/thematiques/testing';
import { Innovation } from 'src/app/innovations/innovation';
import { InnovationService } from 'src/app/innovations/innovation.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchBarStubComponent } from '../testing';

import { SidebarComponent } from './sidebar.component';
import { Results } from 'src/app/innovations/results';
import { RouterTestingModule } from '@angular/router/testing';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let thematiqueServiceSpy: jasmine.SpyObj<ThematiqueService>;
  let innovationServiceSpy: jasmine.SpyObj<InnovationService>;
  const thematiques: Thematique[] = [
    new Thematique(1, 'Pas de pauvreté', '1', 12, 'https://logo.com', '#ef9493'),
    new Thematique(2, 'Faim zéro', '2', 12, 'https://logo.com', '#ef9493'),
  ];
  const innovations = new Results<Innovation>();
  innovations.data = [new Innovation({}), new Innovation({})];

  beforeEach(async () => {
    const thematiqueServiceMock = jasmine.createSpyObj('ThematiqueService', ['getAll']);
    const innovationServiceMock = jasmine.createSpyObj('InnovationService', [
      'getAll',
      'count',
    ]);

    await TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        ThematiqueStubComponent,
        SearchBarStubComponent,
      ],
      imports: [
        RouterTestingModule,
        NgScrollbarModule,
        TranslateModule.forRoot(),
        SharedModule,
      ],
      providers: [
        {
          provide: ThematiqueService,
          useValue: thematiqueServiceMock,
        },
        {
          provide: InnovationService,
          useValue: innovationServiceMock,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    thematiqueServiceSpy = TestBed.inject(ThematiqueService) as jasmine.SpyObj<ThematiqueService>;
    innovationServiceSpy = TestBed.inject(InnovationService) as jasmine.SpyObj<InnovationService>;
    thematiqueServiceSpy.getAll.and.returnValue(of(thematiques));
    innovationServiceSpy.getAll.and.returnValue(of(innovations));
    innovationServiceSpy.count.and.returnValue(of(2));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select an SDG', () => {
    const sdgEl = fixture.debugElement.query(By.css('app-thematique'));
    sdgEl.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.selectedThematique).toBe(thematiques[0]);
  });

  it('should reinitialize the selection', () => {
    component.reinitialize();

    expect(component.selectedThematique).toBeNull();
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
      dispatchEvent: (event: Event) => true,
    };

    expect(component.isOpen()).toEqual(false);
  });
});
