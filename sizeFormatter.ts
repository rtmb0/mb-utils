export class Size {
    private size: string|string[]
    private isArray: boolean
  
    private constructor(size: string|string[]) {
      this.size = size
      this.isArray = Array.isArray(size)
    }
  
    get value() {
      return this.size
    }
  
    get getIsArray( ) {
      return this.isArray
    }
  
    public static create(size: unknown) {
      if (size === '') return new Size(size)
      if (!size || size == null) throw new Error('Invalid size, no value received')
  
      if (typeof size === 'number') return new Size(size.toString())
      if (typeof size === 'string') return new Size(size)
      if (Array.isArray(size) && size.length > 0) {
        const filteredSizes = size
          .filter(item => item)
          .map(item => item.toString())
  
        return new Size(filteredSizes)
      }
      throw new Error('Invalid size type. Could be an empty array or object.')
    }
  }
  
  export class SizeFormatter {
    private groupedSizes: {}
    private sizeValue: string | string[]
    private isArray: boolean
    private extraSizes: string
    private size: Size
  
    constructor (size: Size, extraSizes?: string) {
      this.size = size
      this.sizeValue = size.value
      this.isArray = size.getIsArray
      this.extraSizes = extraSizes ? `- ${extraSizes}` : ''
      this.groupedSizes = {}
      this.groupSizes()
    }
  
    private groupSizes () {
      if (!this.isArray) return
  
      const groupedSizes = {}
  
      for (const size of this.sizeValue) {
        const sizeToNum = parseFloat(size)
        const isSizeNumber = !isNaN(sizeToNum)
  
        if (!isSizeNumber) continue
  
        const shouldBeFormatted = sizeToNum > 1000
  
        if (!shouldBeFormatted) {
          groupedSizes[size] = groupedSizes.hasOwnProperty(size) ? groupedSizes[size] : []
          continue
        }
  
        const eyeSize = sizeToNum.toString().substring(0,2)
        const otherSize = sizeToNum.toString().substring(2,4)
  
        groupedSizes[eyeSize] = groupedSizes.hasOwnProperty(eyeSize) ? [...groupedSizes[eyeSize], otherSize] : [otherSize]
      }
  
      const hasgroupedSizes = Object.keys(groupedSizes).length > 0
  
      this.groupedSizes = hasgroupedSizes ? groupedSizes : {}
    }
  
    formatSizesToHTML (separator: string = '/') {
      const formattedSizes = Object.keys(this.groupedSizes).reduce((acc: string[], key: string) => {
        const hasMultipleSizes = this.groupedSizes[key].length > 1
        return hasMultipleSizes ?  [...acc, `<strong>${key}-${this.groupedSizes[key].join(separator)} ${this.extraSizes} (mm)</strong>`] : [...acc, `<strong>${key} ${this.extraSizes} (mm)</strong>`]
      }, [])
  
      return `${formattedSizes.join(' <br> ')}`
    }
  
    formatSizeWithSeparator (separator: string = '-') {
      if (this.sizeValue === '') return this.sizeValue
  
      const sizeToNum = parseFloat(this.sizeValue as string)
  
      return sizeToNum > 1000 ? `${this.sizeValue.slice(0,2)}${separator}${this.sizeValue.slice(2,4)}` : this.sizeValue
    }
  }