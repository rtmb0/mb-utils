export class Size {
  private size: string | string[];

  private constructor(size: string | string[]) {
    this.size = size;
  }

  get value() {
    return this.size;
  }

  public static create(size: unknown) {
    if (size === '') return new Size(size);
    if (!size || size == null) throw new Error('Invalid size, no value received');

    if (typeof size === 'number') return new Size(size.toString());
    if (typeof size === 'string') return new Size(size);

    return new Size('');
  }
}
