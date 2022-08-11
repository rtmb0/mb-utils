import { SizeFormatter } from '../formatter/sizeFormatter';
import { Size } from '../formatter/size';

describe('formatSizeWithSeparator', () => {
  it('should ignore empty string returns empty string', () => {
    const size = Size.create('');
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizeWithSeparator();
    expect(formattedSize).toBe('');
  });
});

describe('formatSizeWithSeparator', () => {
  it('should not be format double digit string size and return the original value', () => {
    const size = Size.create('46');
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizeWithSeparator();
    expect(formattedSize).toBe('46');
  });
});

describe('formatSizeWithSeparator', () => {
  it('should not format double digit number size but should be converted to string', () => {
    const size = Size.create(46);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizeWithSeparator();
    expect(formattedSize).toBe('46');
  });
});

describe('formatSizeWithSeparator', () => {
  it('should format four digit string size with a separator', () => {
    const size = Size.create('4622');
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizeWithSeparator();
    expect(formattedSize).toBe('46-22');
  });
});

describe('formatSizeWithSeparator', () => {
  it('should format four digit number size with a separator', () => {
    const size = Size.create(4622);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizeWithSeparator();
    expect(formattedSize).toBe('46-22');
  });
});

// format to HTML

describe('formatSizesToHTML', () => {
  it('should format both number convertible strings and pure numbers within mixed typed array', () => {
    const size = Size.create(['4422', 4624, 4822]);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(
      `<strong>44 - 22 (mm)</strong> <br> <strong>46 - 24 (mm)</strong> <br> <strong>48 - 22 (mm)</strong>`,
    );
  });
});

describe('formatSizesToHTML', () => {
  it('should ignore non formattable sizes and format both number convertible strings and pure numbers within mixed typed array', () => {
    const size = Size.create(['4422', 4624, 4822, 'notANumber']);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(
      `<strong>44 - 22 (mm)</strong> <br> <strong>46 - 24 (mm)</strong> <br> <strong>48 - 22 (mm)</strong>`,
    );
  });
});

describe('formatSizesToHTML', () => {
  it('should format only number convertible strings within an array of strings', () => {
    const size = Size.create(['4422', '4624', '4822', 'abc', 'definitelyNotANumber']);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(
      `<strong>44 - 22 (mm)</strong> <br> <strong>46 - 24 (mm)</strong> <br> <strong>48 - 22 (mm)</strong>`,
    );
  });
});

describe('formatSizesToHTML', () => {
  it('should format both double and four digit convertible strings within an array of strings', () => {
    const size = Size.create(['4422', '4624', '48']);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(
      `<strong>44 - 22 (mm)</strong> <br> <strong>46 - 24 (mm)</strong> <br> <strong>48 (mm)</strong>`,
    );
  });
});

describe('formatSizesToHTML', () => {
  it('should group bridge sizes, with a "/" separator, if they have the same eye value', () => {
    const size = Size.create(['4622', '4624', '4626']);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(`<strong>46 - 22/24/26 (mm)</strong>`);
  });
});

describe('formatSizesToHTML', () => {
  it('should group bridge sizes ONLY with the same eye value', () => {
    const size = Size.create(['4622', '4624', '4626', '4822']);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(`<strong>46 - 22/24/26 (mm)</strong> <br> <strong>48 - 22 (mm)</strong>`);
  });
});

describe('formatSizesToHTML', () => {
  it('should format float', () => {
    const size = Size.create(['4624', '4626', '46.22']);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(`<strong>46 - 24/26 (mm)</strong> <br> <strong>46.22 (mm)</strong>`);
  });
});

describe('formatSizesToHTML', () => {
  it('should sort by eye size, even when using floats', () => {
    const size = Size.create(['46.22', '4818', '4626', '4624']);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(`<strong>46 - 24/26 (mm)</strong> <br> <strong>46.22 (mm)</strong> <br> <strong>48 - 18 (mm)</strong>`);
  });
});

describe('formatSizesToHTML', () => {
  it('should sort bridge sizes', () => {
    const size = Size.create(['4626', '4624', '4628']);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(`<strong>46 - 24/26/28 (mm)</strong>`);
  });
});

// falsy and strange mix of values

describe('formatSizesToHTML', () => {
  it('should ignore falsy types and return empty string', () => {
    const size = Size.create([null, NaN, undefined, '', false]);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe('');
  });
});

describe('formatSizesToHTML', () => {
  it('should ignore empty arrays and objects and return empty string', () => {
    const size = Size.create([[], {}]);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe('');
  });
});

describe('formatSizesToHTML', () => {
  it('should ignore falsy types and only return formatted truthy values', () => {
    const size = Size.create([null, 4822, NaN, '4622', undefined, 4624]);
    const formatter = new SizeFormatter(size);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(`<strong>46 - 22/24 (mm)</strong> <br> <strong>48 - 22 (mm)</strong>`);
  });
});

// extra size tests

describe('formatSizesToHTML', () => {
  it('should properly format using one extra size', () => {
    const size = Size.create(['4822', '4622', '4624']);
    const formatter = new SizeFormatter(size, '131');
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(`<strong>46 - 22/24 - 131 (mm)</strong> <br> <strong>48 - 22 - 131 (mm)</strong>`);
  });
});

describe('formatSizesToHTML', () => {
  it('should ignore 25 in favor of its own data (such as: 22 and 24)', () => {
    const size = Size.create(['4822', '4622', '4624']);
    const formatter = new SizeFormatter(size, '25 - 131');
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(`<strong>46 - 22/24 - 131 (mm)</strong> <br> <strong>48 - 22 - 131 (mm)</strong>`);
  });
});

describe('formatSizesToHTML', () => {
  it('should ignore 25 in favor of its own data (such as: 22 and 24), if the last is present', () => {
    const size = Size.create(['4822', '4622', '4624', '50']);
    const formatter = new SizeFormatter(size, '25 - 131');
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(
      `<strong>46 - 22/24 - 131 (mm)</strong> <br> <strong>48 - 22 - 131 (mm)</strong> <br> <strong>50 - 25 - 131 (mm)</strong>`,
    );
  });
});

describe('formatSizesToHTML', () => {
  it('should ignore falsy extra size', () => {
    const size = Size.create(['4822', '4622', '4624']);
    const formatter = new SizeFormatter(size, '');
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(`<strong>46 - 22/24 (mm)</strong> <br> <strong>48 - 22 (mm)</strong>`);
  });
});

describe('formatSizesToHTML', () => {
  it('should ignore undefined extra size', () => {
    const size = Size.create(['4822', '4622', '4624']);
    const formatter = new SizeFormatter(size, undefined);
    const formattedSize = formatter.formatSizesToHTML();
    expect(formattedSize).toBe(`<strong>46 - 22/24 (mm)</strong> <br> <strong>48 - 22 (mm)</strong>`);
  });
});
