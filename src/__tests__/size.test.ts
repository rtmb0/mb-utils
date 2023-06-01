import { Size } from '../formatter/size';

describe('Size', () => {
  it('should not throw errors with an empty string and return a new instance of Size', () => {
    expect(Size.create('')).toBeInstanceOf(Size);
  });
});

describe('Size', () => {
  it('should convert a single number to string', () => {
    const size = Size.create(4622);
    expect(size.value).toBe('4622');
  });
});

// errors

describe('Size', () => {
  it('throws an error when using falsy values for size', () => {
    const errMsg = 'Invalid size, no value received';
    expect(() => Size.create(null)).toThrow(errMsg);
    expect(() => Size.create(undefined)).toThrow(errMsg);
    expect(() => Size.create(NaN)).toThrow(errMsg);
    expect(() => Size.create(false)).toThrow(errMsg);
  });
});
