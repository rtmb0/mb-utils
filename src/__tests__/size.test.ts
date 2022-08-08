import { Size } from '../formatter/size';

describe('Size', () => {
  it('should not throw errors with an empty string and return a new instance of Size', () => {
    expect(Size.create('')).toBeInstanceOf(Size);
  });
});

describe('Size', () => {
  it('should detect when being supplied with an array or not', () => {
    expect(Size.create(['46']).getIsArray).toBe(true);
    expect(Size.create(new Array('46')).getIsArray).toBe(true);
    expect(Size.create('46').getIsArray).toBe(false);
    expect(Size.create(46).getIsArray).toBe(false);
  });
});

describe('Size', () => {
  it('should ignore falsy values from the array and if no values are left then return empty string', () => {
    const size = Size.create([false, null, undefined, NaN]);
    console.log(size.value);
    expect(size.value).toBe('');
  });
});

describe('Size', () => {
  it('should filter out falsy values from arrays', () => {
    const size = Size.create([false, null, '4622', undefined, NaN]);
    console.log(size.value);
    expect(size.value).toEqual(['4622']);
  });
});

describe('Size', () => {
  it('should convert numbers to strings from arrays', () => {
    const size = Size.create([4622, 4822, '4624']);
    console.log(size.value);
    expect(size.value).toEqual(['4622', '4822', '4624']);
  });
});

describe('Size', () => {
  it('should convert a single number to string', () => {
    const size = Size.create(4622);
    console.log(size.value);
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

describe('Size', () => {
  it('throws an error when supplying an empty array or object for size', () => {
    const errMsg = 'Invalid size type. Could be an empty array or object.';
    expect(() => Size.create([])).toThrow(errMsg);
    expect(() => Size.create({})).toThrow(errMsg);
  });
});
