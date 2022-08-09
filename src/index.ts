import { SizeFormatter } from './formatter/sizeFormatter';
import { Size } from './formatter/size';

function formatSizeWithSeparator(sizeValue: string | string[], separator?: string) {
  const size = Size.create(sizeValue);
  const formatter = new SizeFormatter(size);
  return formatter.formatSizeWithSeparator(separator);
}

function formatSizesToHTML(sizeValue: string | string[], extraSize?: string, separator?: string) {
  const size = Size.create(sizeValue);
  const formatter = new SizeFormatter(size, extraSize);
  return formatter.formatSizesToHTML(separator);
}

export default { formatSizeWithSeparator, formatSizesToHTML };
