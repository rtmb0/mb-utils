export class Size {
  private size: string | string[];
  private isArray: boolean;

  private constructor(size: string | string[]) {
    this.size = size;
    this.isArray = Array.isArray(size);
  }

  get value() {
    return this.size;
  }

  get getIsArray() {
    return this.isArray;
  }

  public static create(size: unknown) {
    if (size === '') return new Size(size);
    if (!size || size == null) throw new Error('Invalid size, no value received');

    if (typeof size === 'number') return new Size(size.toString());
    if (typeof size === 'string') return new Size(size);
    if (Array.isArray(size) && size.length > 0) {
      const filteredSizes = size.filter((item) => item).map((item) => item.toString());

      if (filteredSizes.length < 1) return new Size('');

      return new Size(filteredSizes);
    }
    throw new Error('Invalid size type. Could be an empty array or object.');
  }
}
