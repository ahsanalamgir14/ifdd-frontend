import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SharedModule } from 'src/app/shared/shared.module';
import { Category } from '../category';

import { OddCategoryComponent } from './odd-category.component';

describe('OddCategoryComponent', () => {
  let component: OddCategoryComponent;
  let fixture: ComponentFixture<OddCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OddCategoryComponent ],
      imports: [ SharedModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OddCategoryComponent);
    component = fixture.componentInstance;
    component.category = new Category(1, '1.1', 'Category 1', 1);
    fixture.detectChanges();
  });

  it('should emit the unselect category', () => {
    spyOn(component.unselectCategory, 'emit');
    const unselectButton = fixture.debugElement.query(By.css('button'));
    unselectButton.triggerEventHandler('click', null);

    expect(component.unselectCategory.emit).toHaveBeenCalledWith(true);
  });
});
