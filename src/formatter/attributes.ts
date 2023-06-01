export type AttributeValueInput = {
  primary: string | number;
  bridge?: string | number;
  temple?: string | number;
};

export type AttributeValue = {
  primary: string;
  bridge?: string;
  temple?: string;
};

export class Attributes {
  private attributes: AttributeValue[] = [];

  private constructor(attributes: AttributeValue[]) {
    this.attributes = attributes;
  }

  static create(attributes: AttributeValueInput[]) {
    if (!attributes || !Array.isArray(attributes)) throw new Error('Attributes are not defined');

    const isConvertibleToNumber = (attribute: AttributeValueInput) =>
      !isNaN(parseFloat(attribute?.primary?.toString()));
    const isPrimaryValid = (attribute: AttributeValueInput) => attribute.primary && isConvertibleToNumber(attribute);

    const validAttributes: AttributeValue[] = attributes.filter(isPrimaryValid).map((attribute) => {
      const primary = attribute.primary.toString();
      const bridge = attribute?.bridge?.toString();
      const temple = attribute?.temple?.toString();

      return { primary, bridge, temple };
    });

    return new Attributes(validAttributes);
  }

  get value() {
    return this.attributes;
  }
}
