import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { By } from "@angular/platform-browser";

/**
 * Finds a single element inside the Component by the given CSS selector.
 * Throws an error if no element was found.
 *
 * @param fixture Component fixture
 * @param selector CSS selector
 *
 */
 export function queryByCss<T>(
  fixture: ComponentFixture<T>,
  selector: string,
): DebugElement {
  // The return type of DebugElement#query() is declared as DebugElement,
  // but the actual return type is DebugElement | null.
  // See https://github.com/angular/angular/issues/22449.
  const debugElement = fixture.debugElement.query(By.css(selector));
  // Fail on null so the return type is always DebugElement.
  if (!debugElement) {
    throw new Error(`queryByCss: Element with ${selector} not found`);
  }
  return debugElement;
}

/**
 * Returns a selector for the `data-testid` attribute with the given attribute value.
 *
 * @param testId Test id set by `data-testid`
 *
 */
 export function testIdSelector(testId: string): string {
  return `[data-test-id="${testId}"]`;
}

/**
 * Find the first table row in the current page.
 * Throws an error if no element was found.
 *
 * @param fixture Component fixture
 *
 */
export function findTableRow(fixture: ComponentFixture<any>): DebugElement {
  return queryByCss(fixture, `table tbody tr`);
}

/**
 * Finds an element inside the Component by the given `data-testid` attribute.
 * Throws an error if no element was found.
 *
 * @param fixture Component fixture
 * @param testId Test id set by `data-testid`
 *
 */
export function findEl<T>(fixture: ComponentFixture<T>, testId: string): DebugElement {
  return queryByCss<T>(fixture, testIdSelector(testId));
}

/**
 * Finds an element with the given form control name.
 * Throws an error if no element was found.
 *
 * @param fixture Component fixture
 * @param formControlName Name of the form control
 */
export function findControl<T>(fixture: ComponentFixture<T>, formControlName: string): DebugElement {
  return queryByCss<T>(fixture, `[formControlName="${formControlName}"]`);
}

/**
 * Dispatches a fake event (synthetic event) at the given element.
 *
 * @param element Element that is the target of the event
 * @param type Event name, e.g. `input`
 * @param bubbles Whether the event bubbles up in the DOM tree
 */
 export function dispatchFakeEvent(
  element: EventTarget,
  type: string,
  bubbles: boolean = false,
): void {
  const event = document.createEvent('Event');
  event.initEvent(type, bubbles, false);
  element.dispatchEvent(event);
}

/**
 * Enters text into a form field (`input`, `textarea` or `select` element).
 * Triggers appropriate events so Angular takes notice of the change.
 * If you listen for the `change` event on `input` or `textarea`,
 * you need to trigger it separately.
 *
 * @param element Form field
 * @param value Form field value
 */
 export function setFieldElementValue(
  element: HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
  value: string,
): void {
  element.value = value;
  // Dispatch an `input` or `change` fake event
  // so Angular form bindings take notice of the change.
  const isSelect = element instanceof HTMLSelectElement;
  dispatchFakeEvent(element, isSelect ? 'change' : 'input', isSelect ? false : true);
}

export function setFieldValue<T>(
  fixture: ComponentFixture<T>,
  formControlName: string,
  value: string,
): void {
  setFieldElementValue(
    findControl(fixture, formControlName).nativeElement,
    value
  );
}
