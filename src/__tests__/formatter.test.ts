import { SizeFormatter } from '../formatter/sizeFormatter';
import { Size } from '../formatter/size';
import { Attributes } from '../formatter/attributes';

describe('formatSizeWithSeparator', () => {
  it('should ignore empty string returns empty string', () => {
    const size = Size.create('');
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizeWithSeparator(size);
    expect(formattedSize).toBe('');
  });

  it('should not be format double digit string size and return the original value', () => {
    const size = Size.create('46');
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizeWithSeparator(size);
    expect(formattedSize).toBe('46');
  });

  it('should not format double digit number size but should be converted to string', () => {
    const size = Size.create(46);
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizeWithSeparator(size);
    expect(formattedSize).toBe('46');
  });
  it('should format four digit string size with a separator', () => {
    const size = Size.create('4622');
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizeWithSeparator(size);
    expect(formattedSize).toBe('46-22');
  });

  it('should format four digit number size with a separator', () => {
    const size = Size.create(4622);
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizeWithSeparator(size);
    expect(formattedSize).toBe('46-22');
  });
});

// // format to HTML

describe('formatSizesToHTML', () => {
  it('should format both number convertible strings and pure numbers within mixed typed array', () => {
    const rawAttributes = [
      {
        primary: '4422',
      },
      {
        primary: '4624',
      },
      {
        primary: 4822,
        bridge: '26',
      },
    ];
    const attributes = Attributes.create(rawAttributes as any);
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizesToHTML(attributes);
    expect(formattedSize).toBe(
      `<strong>44 - 22 (mm)</strong> <br> <strong>46 - 24 (mm)</strong> <br> <strong>48 - 22 (mm)</strong>`,
    );
  });
});

describe('formatSizesToHTML', () => {
    it('should format only number convertible strings within an array of strings', () => {
    const rawAttributes = [
      {
        primary: '4422',
      },
      {
        primary: '4624',
      },
      {
        primary: 'definitelyNotANumber',
      },
    ];
    const attributes = Attributes.create(rawAttributes);
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizesToHTML(attributes);
    expect(formattedSize).toBe(
      `<strong>44 - 22 (mm)</strong> <br> <strong>46 - 24 (mm)</strong>`,
    );
  });
  it('should format both double and four digit convertible strings within an array of strings', () => {
    const rawAttributes = [
      {
        primary: '44',
        bridge: '22',
      },
      {
        primary: '46',
        bridge: '24',
      },
      {
        primary: '48',
      },
    ];
    const attributes = Attributes.create(rawAttributes);
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizesToHTML(attributes);
    expect(formattedSize).toBe(
      `<strong>44 - 22 (mm)</strong> <br> <strong>46 - 24 (mm)</strong> <br> <strong>48 (mm)</strong>`,
    );
  });

  it('should group bridge sizes, with a "/" separator, if they have the same primary value', () => {
    const rawAttributes = [
      {
        primary: '4622',
        bridge: '22',
      },
      {
        primary: '4624',
        bridge: '24',
      },
      {
        primary: '4626',
        bridge: '26',
      },
    ];
    const attributes = Attributes.create(rawAttributes);
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizesToHTML(attributes);
    expect(formattedSize).toBe(`<strong>46 - 22/24/26 (mm)</strong>`);
  });

  it('should group bridge sizes ONLY with the same primary value', () => {
    const rawAttributes = [
      {
        primary: '4622',
        bridge: '22',
      },
      {
        primary: '4624',
        bridge: '24',
      },
      {
        primary: '4626',
        bridge: '26',
      },
      {
        primary: '4822',
        bridge: '22',
      },
    ];
    const attributes = Attributes.create(rawAttributes);
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizesToHTML(attributes);
    expect(formattedSize).toBe(`<strong>46 - 22/24/26 (mm)</strong> <br> <strong>48 - 22 (mm)</strong>`);
  });

  it('should format float', () => {
    const rawAttributes = [
      {
        primary: '4624',
        bridge: '22',
      },
      {
        primary: '4626',
        bridge: '24',
      },
      {
        primary: '46.22',
      },
    ];
    const attributes = Attributes.create(rawAttributes);
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizesToHTML(attributes);
    expect(formattedSize).toBe(`<strong>46 - 24/26 (mm)</strong> <br> <strong>46.22 (mm)</strong>`);
  });

  it('should sort by primary size, even when using floats', () => {
    const rawAttributes = [
      {
        primary: '46.22',
      },
      {
        primary: '4818',
      },
      {
        primary: '4626',
      },
      {
        primary: '4624',
      },
    ];
    const attributes = Attributes.create(rawAttributes);
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizesToHTML(attributes);
    expect(formattedSize).toBe(
      `<strong>46 - 24/26 (mm)</strong> <br> <strong>46.22 (mm)</strong> <br> <strong>48 - 18 (mm)</strong>`,
    );
  });

  it('should sort bridge sizes', () => {
    const rawAttributes = [
      {
        primary: '4628',
        bridge: '22',
      },
      {
        primary: '4626',
        bridge: '24',
      },
      {
        primary: '4624',
        bridge: '26',
      },
    ];
    const attributes = Attributes.create(rawAttributes);
    const formatter = new SizeFormatter();
    const formattedSize = formatter.formatSizesToHTML(attributes);
    expect(formattedSize).toBe(`<strong>46 - 24/26/28 (mm)</strong>`);
  });

  describe('julius tart 4 digits primary size shananigans', () => {
    it('should ignore bridge size (25) in favor of its own data (such as: 22 and 24)', () => {
      const rawAttributes = [
        {
          primary: '4622',
          bridge: '25',
          temple: '131',
        },
        {
          primary: '4624',
          bridge: '25',
          temple: '131',
        },
        {
          primary: '4822',
          bridge: '25',
          temple: '135',
        },
      ];
      const attributes = Attributes.create(rawAttributes);
      const formatter = new SizeFormatter();
      const formattedSize = formatter.formatSizesToHTML(attributes);
      expect(formattedSize).toBe(`<strong>46 - 22/24 - 131 (mm)</strong> <br> <strong>48 - 22 - 135 (mm)</strong>`);
    });

    it('should ignore bridge (25) in favor of its own data (such as: 22 and 24), unless it has two digits', () => {
      const rawAttributes = [
        {
          primary: '4622',
          bridge: '25',
          temple: '131',
        },
        {
          primary: '4624',
          bridge: '25',
          temple: '131',
        },
        {
          primary: '50',
          bridge: '25',
          temple: '135',
        },
      ];
      const attributes = Attributes.create(rawAttributes);
      const formatter = new SizeFormatter();
      const formattedSize = formatter.formatSizesToHTML(attributes);
      expect(formattedSize).toBe(`<strong>46 - 22/24 - 131 (mm)</strong> <br> <strong>50 - 25 - 135 (mm)</strong>`);
    });
  });
  describe('temple size tests', () => {
    it('should properly format using the temple of each attribute', () => {
      const rawAttributes = [
        {
          primary: '4622',
          bridge: '22',
          temple: '140',
        },
        {
          primary: '4624',
          bridge: '24',
          temple: '140',
        },
        {
          primary: '48',
          temple: '150',
        },
      ];
      const attributes = Attributes.create(rawAttributes);
      const formatter = new SizeFormatter();
      const formattedSize = formatter.formatSizesToHTML(attributes);
      expect(formattedSize).toBe(`<strong>46 - 22/24 - 140 (mm)</strong> <br> <strong>48 - 150 (mm)</strong>`);
    });
  });

  // falsy and strange mix of values

  describe('falsy and strange mix of values', () => {
    it('should ignore falsy types', () => {
      const rawAttributes = [
        {
          primary: '4622',
          bridge: '22',
          temple: '140',
        },
        {
          primary: '4624',
          bridge: '24',
          temple: '140',
        },
        {
          primary: '4822',
          temple: '150',
        },
        {
          primary: null,
          bridge: NaN,
          temple: undefined,
        },
      ];
      const attributes = Attributes.create(rawAttributes as any);
      const formatter = new SizeFormatter();
      const formattedSize = formatter.formatSizesToHTML(attributes);
      expect(formattedSize).toBe(`<strong>46 - 22/24 - 140 (mm)</strong> <br> <strong>48 - 22 - 150 (mm)</strong>`);
    });

    it('should ignore falsy types and return empty string', () => {
      const rawAttributes = [
        {
          primary: null,
        },
        {
          primary: NaN,
        },
        {
          primary: undefined,
        },
        {
          primary: '',
        },
        {
          primary: false,
        },
      ];
      const attributes = Attributes.create(rawAttributes as any);
      const formatter = new SizeFormatter();
      const formattedSize = formatter.formatSizesToHTML(attributes);
      expect(formattedSize).toBe('');
    });

    it('should ignore empty arrays and return an empty string', () => {
      const rawAttributes = [] as any;
      const attributes = Attributes.create(rawAttributes);
      const formatter = new SizeFormatter();
      const formattedSize = formatter.formatSizesToHTML(attributes as any);
      expect(formattedSize).toBe('');
    });
  });
});
