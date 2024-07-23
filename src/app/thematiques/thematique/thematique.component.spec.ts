import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';
import { Thematique } from '../thematique';

import { ThematiqueComponent } from './thematique.component';
import { Category } from '../category';
import { ThematiqueService } from '../thematique.service';

describe('ThematiqueComponent', () => {
  let component: ThematiqueComponent;
  let fixture: ComponentFixture<ThematiqueComponent>;
  let thematiqueServiceSpy: jasmine.SpyObj<ThematiqueService>;
  const thematique: Thematique = new Thematique(1, 'Pas de pauvreté', '1', 12, 'https://logo.com', '#ef9493');
  const categories: Category[] = [
    new Category(1, '1.1', 'Category 1', 1, thematique),
    new Category(2, '1.2', 'Category 2', 1, thematique),
    new Category(3, '1.3', 'Category 3', 1, thematique),
  ];
  thematique.categories = categories;

  beforeEach(async () => {
    const thematiqueServiceMock = jasmine.createSpyObj('ThematiqueService', ['get']);

    await TestBed.configureTestingModule({
      declarations: [ ThematiqueComponent ],
      imports: [ TranslateModule.forRoot(), SharedModule ],
      providers: [
        { provide: ThematiqueService, useValue: thematiqueServiceMock },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThematiqueComponent);
    component = fixture.componentInstance;
    component.thematique = thematique;
    component.selected = true;
    thematiqueServiceSpy = TestBed.inject(ThematiqueService) as jasmine.SpyObj<ThematiqueService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show the categories', () => {
    thematiqueServiceSpy.get.and.returnValue(of(thematique));
    const categoriesTrigger = fixture.debugElement.query(By.directive(CdkOverlayOrigin));
    categoriesTrigger.triggerEventHandler('click', null);

    expect(thematiqueServiceSpy.get).toHaveBeenCalledWith(thematique.id);
  });

  it('should select the first value in the categories', () => {
    thematiqueServiceSpy.get.and.returnValue(of(thematique));
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
    thematiqueServiceSpy.get.and.returnValue(of(thematique));
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
    thematiqueServiceSpy.get.and.returnValue(of(thematique));
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
