import { Size } from './size';

export class SizeFormatter {
  private groupedSizes: { [index: string]: string[] };
  private sizeValue: string | string[];
  private isArray: boolean;
  private extraSizes: string;
  private size: Size;
  private singleExtraSizes: string;
  private multipleExtraSizes: string;
  private sortedKeys: string[];

  constructor(size: Size, extraSizes?: string) {
    this.size = size;
    this.sizeValue = size.value;
    this.isArray = size.getIsArray;
    this.extraSizes = extraSizes ? extraSizes : ' ';
    this.groupedSizes = {};
    this.singleExtraSizes = '';
    this.multipleExtraSizes = '';
    this.sortedKeys = [];
    this.formatExtraSizes();
    this.groupSizes();
    this.sortGroupedSizes();
  }

  private sortGroupedSizes() {
    if (Object.keys(this.groupedSizes).length < 1) return;
    this.sortedKeys = Object.keys(this.groupedSizes).sort((a, b) => parseFloat(a) - parseFloat(b));
  }

  private groupSizes() {
    if (!this.isArray) return;

    const groupedSizes: { [index: string]: string[] } = {};

    for (const size of this.sizeValue) {
      const sizeToNum = parseFloat(size);
      const isSizeNumber = !isNaN(sizeToNum);

      if (!isSizeNumber) continue;

      const shouldBeFormatted = sizeToNum > 1000;

      if (!shouldBeFormatted) {
        groupedSizes[size] = groupedSizes.hasOwnProperty(size) ? groupedSizes[size] : [];
        continue;
      }

      const eyeSize = sizeToNum.toString().substring(0, 2);
      const otherSize = sizeToNum.toString().substring(2, 4);

      groupedSizes[eyeSize] = groupedSizes.hasOwnProperty(eyeSize)
        ? [...groupedSizes[eyeSize], otherSize].sort((a, b) => parseFloat(a) - parseFloat(b))
        : [otherSize];
    }

    const hasGroupedSizes = Object.keys(groupedSizes).length > 0;

    this.groupedSizes = hasGroupedSizes ? groupedSizes : {};
  }

  private isFormattable() {
    return parseFloat(this.sizeValue as string) > 1000;
  }

  private formatExtraSizes() {
    const multipleExtraSizes =
      this.extraSizes === ' '
        ? this.extraSizes
        : this.extraSizes.split(' ').length === 1
        ? ` - ${this.extraSizes} `
        : ` - ${this.extraSizes.split(' - ')[1]} `;

    const singleExtraSizes = this.extraSizes === ' ' ? this.extraSizes : ` - ${this.extraSizes} `;

    this.multipleExtraSizes = multipleExtraSizes;
    this.singleExtraSizes = singleExtraSizes;
  }

  formatSizesToHTML(separator: string = '/') {
    if (!this.isArray) return '';

    const formattedSizes = this.sortedKeys.reduce((acc: string[], key: string) => {
      const hasMultipleSizes = this.groupedSizes[key].length > 0;

      return hasMultipleSizes
        ? [...acc, `<strong>${key} - ${this.groupedSizes[key].join(separator)}${this.multipleExtraSizes}(mm)</strong>`]
        : [...acc, `<strong>${key}${this.singleExtraSizes}(mm)</strong>`];
    }, []);

    return `${formattedSizes.join(' <br> ')}`;
  }

  formatSizeWithSeparator(separator: string = '-') {
    if (this.sizeValue === '') return this.sizeValue;

    return this.isFormattable()
      ? `${this.sizeValue.slice(0, 2)}${separator}${this.sizeValue.slice(2, 4)}`
      : this.sizeValue;
  }

  getEyeSize() {
    if (this.isArray) return this.sizeValue;

    return this.isFormattable() ? this.sizeValue.slice(0, 2) : this.sizeValue;
  }
}
