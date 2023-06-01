import { Size } from './size';
import { Attributes } from './attributes';
import type { AttributeValue } from './attributes';
export class SizeFormatter {
  private sortPrimaryByAscending(data: AttributeValue[]) {
    return data.sort((a, b) => parseFloat(a.primary) - parseFloat(b.primary));
  }

  private groupBy<T>(attributes: T[], keyFunc: (item: T) => string) {
    return attributes.reduce((acc, attribute) => {
      const key = keyFunc(attribute);
      const group = acc.get(key) ?? [];
      group.push(attribute);
      acc.set(key, group);
      return acc;
    }, new Map<string, T[]>());
  }

  private isFormattable(size: string) {
    return parseFloat(size as string) > 1000;
  }

  normalizePrimaryAttributes(attributes: AttributeValue[]) {
    // julius tart edge case: primary can be 2 or 4 digits
    return attributes.map((attribute) => {
      if (attribute.primary.length === 4)
        return {
          primary: attribute.primary.slice(0, 2),
          bridge: attribute.primary.slice(2, 4),
          temple: attribute.temple,
        };
      return attribute;
    });
  }

  formatSizesToHTML(attributesData: Attributes, separator: string = '/') {
    const attributes = attributesData.value;
    if (attributes.length === 0) return '';

    const normalizedAttributes = this.normalizePrimaryAttributes(attributes);
    const sortedValues = this.sortPrimaryByAscending(normalizedAttributes);
    const groupedSizes = this.groupBy(sortedValues, (attribute) => attribute.primary);
    if (groupedSizes.size === 0) return '';
    const format = (data: string) => (data ? ` - ${data}` : '');

    const formatted = Array.from(groupedSizes.values()).map((group) => {
      const primary = group[0].primary;
      const bridgeValues = [...new Set(group.map((item) => item.bridge!).filter((item) => item))];
      bridgeValues.sort((a, b) => parseFloat(a) - parseFloat(b));
      const bridge = bridgeValues.length > 1 ? bridgeValues.join(separator) : bridgeValues[0] || '';
      const temple = group[0].temple || '';

      return `<strong>${primary}${format(bridge)}${format(temple)} (mm)</strong>`;
    });

    return `${formatted.join(' <br> ')}`;
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
