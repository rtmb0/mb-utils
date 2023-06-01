import { SizeFormatter } from './formatter/sizeFormatter';
import { Size } from './formatter/size';
import { Attributes, AttributeValueInput } from './formatter/attributes';
export type { AttributeValueInput };

export function formatSizeWithSeparator(sizeValue: string, separator?: string) {
  const size = Size.create(sizeValue);
  const formatter = new SizeFormatter();
  return formatter.formatSizeWithSeparator(size, separator);
}

export function formatSizesToHTML(rawAttributes: AttributeValueInput[], separator?: string) {
  const attributes = Attributes.create(rawAttributes);
  const formatter = new SizeFormatter();
  return formatter.formatSizesToHTML(attributes, separator);
}

export function getEyeSize(sizeValue: string) {
  const size = Size.create(sizeValue);
  const formatter = new SizeFormatter();
  return formatter.getEyeSize(size);
}
