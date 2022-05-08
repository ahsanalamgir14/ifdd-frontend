import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { findEl } from 'src/testing/utils';
import { SharedModule } from '../shared.module';
import { MenuTriggerForDirective } from './menu-trigger-for.directive';
import { MenuComponent } from './menu/menu.component';

@Component({
  'template': `
    <button [appMenuTriggerFor]="testMenu" data-test-id="open-menu">Test Menu</button>
    <app-menu #testMenu data-test-id="menu"></app-menu>
  `
})
class TestComponent {}

describe('MenuTriggerForDirective', () => {
  let fixture: any;
  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ TestComponent, MenuTriggerForDirective, MenuComponent ],
      imports: [ SharedModule ],
    })
    .createComponent(TestComponent)
    fixture.detectChanges();
  })

  it('should have one menu trigger', () => {
    const trigger = fixture.debugElement.queryAll(By.directive(MenuTriggerForDirective));

    expect(trigger.length).toEqual(1);
  });

  it('should open the menu', () => {
    const button = findEl(fixture, 'open-menu');
    button.triggerEventHandler('click', null);
    const menu = findEl(fixture, 'menu');

    expect(menu).toBeTruthy();
  });
});
