export type AttributeValue = {
  eye: string;
  bridge?: string;
  temple?: string;
};

export class Attributes {
  private attributes: AttributeValue[] = [];

  private constructor(attributes: AttributeValue[]) {
    this.attributes = attributes;
  }

  static create(attributes: AttributeValue[]) {
    if (!attributes || !Array.isArray(attributes)) throw new Error('Attribute is not defined');
    

    return new Attributes(attributes);
  }

  get value() {
    return this.attributes;
  }
}
