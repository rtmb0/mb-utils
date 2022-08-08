import {  SizeFormatter } from './formatter/sizeFormatter';
import { Size } from './formatter/size';

function formatWithSeparator (sizeVal: string|string[], separator?: string) {
    const size = Size.create(sizeVal)
    const formatter = new SizeFormatter(size)
    return formatter.formatSizeWithSeparator(separator)
}

function formatToHTML (sizeVal: string|string[], extraSize?: string, separator?: string) {
    const size = Size.create(sizeVal)
    const formatter = new SizeFormatter(size, extraSize)
    return formatter.formatSizesToHTML(separator)
}

export { formatWithSeparator, formatToHTML }