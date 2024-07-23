import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { Category } from '../category';
import { Thematique } from '../thematique';

import { ThematiqueCategoryComponent } from './thematique-category.component';

describe('ThematiqueCategoryComponent', () => {
  let component: ThematiqueCategoryComponent;
  let fixture: ComponentFixture<ThematiqueCategoryComponent>;
  const thematique: Thematique = new Thematique(1, 'Pas de pauvreté', '1', 12, 'https://logo.com', '#ef9493');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ThematiqueCategoryComponent ],
      imports: [ SharedModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ThematiqueCategoryComponent);
    component = fixture.componentInstance;
    component.category = new Category(1, '1.1', 'Category 1', 1, thematique);
    fixture.detectChanges();
  });

  it('should emit the unselect category', () => {
    spyOn(component.unselectCategory, 'emit');
    const unselectButton = fixture.debugElement.query(By.css('button'));
    unselectButton.triggerEventHandler('click', null);

    expect(component.unselectCategory.emit).toHaveBeenCalledWith(true);
  });
});
