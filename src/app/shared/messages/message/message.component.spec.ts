import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { Message } from '../message';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    component.message = new Message('success', 'Operation successful!');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
