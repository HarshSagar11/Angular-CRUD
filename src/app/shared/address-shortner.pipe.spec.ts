import { AddressShortnerPipe } from './address-shortner.pipe';

describe('AddressShortnerPipe', () => {
  it('create an instance', () => {
    const pipe = new AddressShortnerPipe();
    expect(pipe).toBeTruthy();
  });
});
