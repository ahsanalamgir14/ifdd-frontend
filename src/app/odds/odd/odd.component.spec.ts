import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { Odd } from '../odd';
import { Target } from 'src/app/orgs/target';
import { TargetService } from 'src/app/orgs/target.service';

import { OddComponent } from './odd.component';

describe('OddComponent', () => {
  let component: OddComponent;
  let fixture: ComponentFixture<OddComponent>;
  let targetServiceSpy: jasmine.SpyObj<TargetService>;
  const odd: Odd = new Odd(1, 'Pas de pauvreté', 12, 'https://logo.com', '#ef9493');
  const targets: Target[] = [
    new Target('1.1', 'Target 1'),
    new Target('1.2', 'Target 2'),
    new Target('1.3', 'Target 3')
  ];

  beforeEach(async () => {
    const targetServiceMock = jasmine.createSpyObj('TargetService', ['getTargetsForSdg']);

    await TestBed.configureTestingModule({
      declarations: [ OddComponent ],
      imports: [ TranslateModule.forRoot(), SharedModule ],
      providers: [
        { provide: TargetService, useValue: targetServiceMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddComponent);
    component = fixture.componentInstance;
    component.odd = odd;
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

    expect(targetServiceSpy.getTargetsForSdg).toHaveBeenCalledWith(odd.id);
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
