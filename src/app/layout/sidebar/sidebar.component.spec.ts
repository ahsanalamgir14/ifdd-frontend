import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { of } from 'rxjs';
import { OrgService } from 'src/app/orgs/org.service';
import { OrgsSdg } from 'src/app/orgs/orgs-sdg';
import { OrgSdgStubComponent } from 'src/app/orgs/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { SearchBarStubComponent } from '../testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let orgServiceSpy: jasmine.SpyObj<OrgService>;
  const orgsSdg: OrgsSdg[] = [
    {
      sdg: {
        id: 1,
        name: "Pas de pauvreté"
      },
      orgsCount: 12
    },
    {
      sdg: {
        id: 2,
        name: "Faim \"zéro\""
      },
      orgsCount: 32
    },
    {
      sdg: {
        id: 3,
        name: "Bonne santé et bien-être"
      },
      orgsCount: 41
    },
  ];

  beforeEach(async () => {
    const orgServiceMock = jasmine.createSpyObj('OrgService', ['getOrgsBySdg']);

    await TestBed.configureTestingModule({
      declarations: [
        SidebarComponent,
        OrgSdgStubComponent,
        SearchBarStubComponent,
      ],
      imports: [
        NgScrollbarModule,
        TranslateModule.forRoot(),
        SharedModule
      ],
      providers: [
        {
          provide: OrgService,
          useValue: orgServiceMock
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    orgServiceSpy = TestBed.inject(OrgService) as jasmine.SpyObj<OrgService>;
    orgServiceSpy.getOrgsBySdg.and.returnValue(of(orgsSdg));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select an SDG', () => {
    const sdgEl = fixture.debugElement.query(By.css('app-org-sdg'));
    sdgEl.triggerEventHandler('click', {});
    fixture.detectChanges();

    expect(component.selectedOrgSdg).toBe(orgsSdg[0]);
  });

  it('should reinitialize the selection', () => {
    component.reinitialize();

    expect(component.selectedOrgSdg).toBeNull();
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
