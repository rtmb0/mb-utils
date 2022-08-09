import { SizeFormatter } from './formatter/sizeFormatter';
import { Size } from './formatter/size';

export function formatSizeWithSeparator(sizeValue: string, separator?: string) {
  const size = Size.create(sizeValue);
  const formatter = new SizeFormatter(size);
  return formatter.formatSizeWithSeparator(separator);
}

export function formatSizesToHTML(sizeValue: string[], extraSize?: string, separator?: string) {
  const size = Size.create(sizeValue);
  const formatter = new SizeFormatter(size, extraSize);
  return formatter.formatSizesToHTML(separator);
}