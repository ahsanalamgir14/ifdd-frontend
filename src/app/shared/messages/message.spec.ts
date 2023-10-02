import { Message } from './message';

describe('Message', () => {
  it('should create an instance', () => {
    expect(new Message('error', 'There has been an error')).toBeTruthy();
  });
});
