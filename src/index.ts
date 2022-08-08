import {  SizeFormatter } from './formatter/sizeFormatter';
import { Size } from './formatter/size';

export function formatWithSeparator (sizeVal: string|string[], separator?: string) {
    const size = Size.create(sizeVal)
    const formatter = new SizeFormatter(size)
    return formatter.formatSizeWithSeparator(separator)
}

export function formatToHTML (sizeVal: string|string[], extraSize?: string, separator?: string) {
    const size = Size.create(sizeVal)
    const formatter = new SizeFormatter(size, extraSize)
    return formatter.formatSizesToHTML(separator)
}