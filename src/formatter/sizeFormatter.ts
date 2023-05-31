import { Size } from './size';
import { Attributes } from './attributes';
import type { AttributeValue } from './attributes';
type GroupedAttribute = {
  eye: string;
  bridge: string[];
  temple: string;
};
type GroupedSizes = Record<string, GroupedAttribute>;

export class SizeFormatter {
  constructor() {}

  private sortGroupedSizes(groupedSizes: GroupedSizes) {
    return Object.keys(groupedSizes).sort((a, b) => parseFloat(a) - parseFloat(b));
  }

  private sortBridge(sortBridge: GroupedAttribute['bridge']) {
    return sortBridge.sort((a, b) => parseFloat(a) - parseFloat(b));
  }

  private groupSizes(attributes: AttributeValue[]) {
    const groupedSizes: GroupedSizes = {};

    for (const attribute of attributes) {
      const eye = attribute.eye;
      const sizeToNum = parseFloat(eye);
      const isSizeNumber = !isNaN(sizeToNum);

      if (!isSizeNumber) continue;
      const shouldBeFormatted = this.isFormattable(eye);

      if (!shouldBeFormatted) {
        const maybeBridge = attribute.bridge ? [attribute.bridge] : [];
        const bridge = groupedSizes.hasOwnProperty(eye)
          ? [...groupedSizes[eye].bridge, ...maybeBridge]
          : [...maybeBridge];
        groupedSizes[eye] = { eye, bridge, temple: attribute.temple || '' };
        continue;
      }

      const eyeSize = sizeToNum.toString().substring(0, 2);
      const bridge = sizeToNum.toString().substring(2, 4);

      if (groupedSizes.hasOwnProperty(eyeSize)) {
        groupedSizes[eyeSize].bridge = [...groupedSizes[eyeSize].bridge, bridge];
      } else {
        groupedSizes[eyeSize] = {
          eye: eyeSize,
          bridge: [bridge],
          temple: attribute.temple || '',
        };
      }

      if (groupedSizes[eyeSize].bridge.length > 0)
        groupedSizes[eyeSize].bridge = this.sortBridge(groupedSizes[eyeSize].bridge);
    }

    return groupedSizes;
  }

  private isFormattable(size: string) {
    return parseFloat(size as string) > 1000;
  }

  formatSizesToHTML(attributesData: Attributes, separator: string = '/') {
    const attributes = attributesData.value;
    if (attributes.length === 0) return '';

    const groupedSizes = this.groupSizes(attributes);
    const sortedKeys = this.sortGroupedSizes(groupedSizes);
    if (Object.keys(groupedSizes).length === 0) return '';
    console.log('GROUPED', groupedSizes);

    const formattedSizes = sortedKeys.reduce((acc: string[], eye: string) => {
      const temple = groupedSizes[eye].temple ? ` - ${groupedSizes[eye].temple} ` : ' ';
      const bridgeSizes = groupedSizes[eye].bridge;
      let bridge = '';
      if (bridgeSizes.length === 1) bridge = ` - ${[...new Set(bridgeSizes)].join('')}`;
      if (bridgeSizes.length > 1) bridge = ` - ${[...new Set(bridgeSizes)].join(separator)}`;
      console.log({
        eye,
        bridge,
        temple,
      });

      return [...acc, `<strong>${eye}${bridge}${temple}(mm)</strong>`];
    }, []);

    return `${formattedSizes.join(' <br> ')}`;
  }

  formatSizeWithSeparator(size: Size, separator: string = '-') {
    if (size.value === '') return size.value;

    return this.isFormattable(size.value as string)
      ? `${size.value.slice(0, 2)}${separator}${size.value.slice(2, 4)}`
      : size.value;
  }

  getEyeSize(size: Size) {
    const isArray = Array.isArray(size);
    if (isArray) return size.value;

    return this.isFormattable(size.value as string) ? size.value.slice(0, 2) : size.value;
  }
}
