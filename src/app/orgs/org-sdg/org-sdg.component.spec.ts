import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrgsSdg } from '../orgs-sdg';
import { Sdg } from '../sdg';
import { Target } from '../target';
import { TargetService } from '../target.service';

import { OrgSdgComponent } from './org-sdg.component';

describe('OrgSdgComponent', () => {
  let component: OrgSdgComponent;
  let fixture: ComponentFixture<OrgSdgComponent>;
  let targetServiceSpy: jasmine.SpyObj<TargetService>;
  const sdg: Sdg = new Sdg(1, 'SDG 1');
  const orgSdg: OrgsSdg = new OrgsSdg(sdg, 3);
  const targets: Target[] = [
    new Target('1.1', 'Target 1'),
    new Target('1.2', 'Target 2'),
    new Target('1.3', 'Target 3')
  ];

  beforeEach(async () => {
    const targetServiceMock = jasmine.createSpyObj('TargetService', ['getTargetsForSdg']);

    await TestBed.configureTestingModule({
      declarations: [ OrgSdgComponent ],
      imports: [ TranslateModule.forRoot(), SharedModule ],
      providers: [
        { provide: TargetService, useValue: targetServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgSdgComponent);
    component = fixture.componentInstance;
    component.orgSdg = orgSdg;
    component.selected = true;
    targetServiceSpy = TestBed.inject(TargetService) as jasmine.SpyObj<TargetService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the targets', () => {
    targetServiceSpy.getTargetsForSdg.and.returnValue(of([]));
    const targetsTrigger = fixture.debugElement.query(By.directive(CdkOverlayOrigin));
    targetsTrigger.triggerEventHandler('click', null);

    expect(targetServiceSpy.getTargetsForSdg).toHaveBeenCalledWith(orgSdg.sdg.id);
  });

  it('should select the first value in the targets', () => {
    targetServiceSpy.getTargetsForSdg.and.returnValue(of(targets));
    // Open the targets selector
    const targetsTrigger = fixture.debugElement.query(By.directive(CdkOverlayOrigin));
    targetsTrigger.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Select the first checkbox
    const checkbox = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'))[1];
    // Uncheck the first target
    checkbox.triggerEventHandler('change', { target: { checked: false } });
    fixture.detectChanges();
    // Check the first target
    checkbox.triggerEventHandler('change', { target: { checked: true } });
    fixture.detectChanges();
    expect(component.form.get('targets')?.value).toEqual([true, true, true]);
  });

  it('should check all the check boxes', () => {
    targetServiceSpy.getTargetsForSdg.and.returnValue(of(targets));
    // Open the targets selector
    const targetsTrigger = fixture.debugElement.query(By.directive(CdkOverlayOrigin));
    targetsTrigger.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Select the first checkbox
    const checkbox = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'))[0];
    checkbox.triggerEventHandler('change', { target: { checked: true } });
    fixture.detectChanges();

    expect(component.form.get('targets')?.value).toEqual([true, true, true]);
  });

  it('should uncheck all the check boxes', () => {
    targetServiceSpy.getTargetsForSdg.and.returnValue(of(targets));
    // Open the targets selector
    const targetsTrigger = fixture.debugElement.query(By.directive(CdkOverlayOrigin));
    targetsTrigger.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Select the first checkbox
    const checkbox = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'))[0];
    checkbox.triggerEventHandler('change', { target: { checked: true } });
    checkbox.triggerEventHandler('change', { target: { checked: false } });
    fixture.detectChanges();

    expect(component.form.get('targets')?.value).toEqual([false, false, false]);
  });

  it('should return overlay panel classes', () => {
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

    expect(component.getCdkConnectedOverlayPanelClasses()).toEqual(['fixed', '!top-0', '!bottom-0', '!left-0', '!right-0']);
  });
});
