import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { Odd } from '../odd';

import { OddComponent } from './odd.component';
import { Category } from '../category';
import { OddService } from '../odd.service';

describe('OddComponent', () => {
  let component: OddComponent;
  let fixture: ComponentFixture<OddComponent>;
  let oddServiceSpy: jasmine.SpyObj<OddService>;
  const odd: Odd = new Odd(1, 'Pas de pauvreté', '1', 12, 'https://logo.com', '#ef9493');
  const categories: Category[] = [
    new Category(1, '1.1', 'Category 1', 1, odd),
    new Category(2, '1.2', 'Category 2', 1, odd),
    new Category(3, '1.3', 'Category 3', 1, odd),
  ];
  odd.categories = categories;

  beforeEach(async () => {
    const oddServiceMock = jasmine.createSpyObj('OddService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [ OddComponent ],
      imports: [ TranslateModule.forRoot(), SharedModule ],
      providers: [
        { provide: OddService, useValue: oddServiceMock },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddComponent);
    component = fixture.componentInstance;
    component.odd = odd;
    component.selected = true;
    oddServiceSpy = TestBed.inject(OddService) as jasmine.SpyObj<OddService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the categories', () => {
    oddServiceSpy.get.and.returnValue(of(odd));
    const categoriesTrigger = fixture.debugElement.query(By.directive(CdkOverlayOrigin));
    categoriesTrigger.triggerEventHandler('click', null);

    expect(oddServiceSpy.get).toHaveBeenCalledWith(odd.id);
  });

  it('should select the first value in the categories', () => {
    oddServiceSpy.get.and.returnValue(of(odd));
    // Open the categories selector
    const categoriesTrigger = fixture.debugElement.query(By.directive(CdkOverlayOrigin));
    categoriesTrigger.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Select the first checkbox
    const checkbox = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'))[1];
    // Uncheck the first category
    checkbox.triggerEventHandler('change', { target: { checked: false } });
    fixture.detectChanges();
    // Check the first category
    checkbox.triggerEventHandler('change', { target: { checked: true } });
    fixture.detectChanges();
    expect(component.form.get('categories')?.value).toEqual([true, true, true]);
  });

  it('should check all the check boxes', () => {
    oddServiceSpy.get.and.returnValue(of(odd));
    // Open the categories selector
    const categoriesTrigger = fixture.debugElement.query(By.directive(CdkOverlayOrigin));
    categoriesTrigger.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Select the first checkbox
    const checkbox = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'))[0];
    checkbox.triggerEventHandler('change', { target: { checked: true } });
    fixture.detectChanges();

    expect(component.form.get('categories')?.value).toEqual([true, true, true]);
  });

  it('should uncheck all the check boxes', () => {
    oddServiceSpy.get.and.returnValue(of(odd));
    // Open the categories selector
    const categoriesTrigger = fixture.debugElement.query(By.directive(CdkOverlayOrigin));
    categoriesTrigger.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Select the first checkbox
    const checkbox = fixture.debugElement.queryAll(By.css('input[type="checkbox"]'))[0];
    checkbox.triggerEventHandler('change', { target: { checked: true } });
    checkbox.triggerEventHandler('change', { target: { checked: false } });
    fixture.detectChanges();

    expect(component.form.get('categories')?.value).toEqual([false, false, false]);
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
