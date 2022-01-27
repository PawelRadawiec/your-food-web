import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hoursSeparator' })
export class HoursSeparatorPipe implements PipeTransform {
  transform(value: string | number, separator?: string) {
    if (!value) {
      return '';
    }
    const hours = String(value);
    if (hours && hours.length !== 4) {
      return '';
    }
    return `${hours.slice(0, 2)}${separator ?? ':'}${hours.slice(2, 4)}`;
  }
}
