import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'days' })
export class DaysPipe implements PipeTransform {
  transform(value: number) {
    switch (value) {
      case 0:
        return 'Monday';
      case 1:
        return 'Tuesday';
      case 2:
        return 'Wednesday';
      case 3:
        return 'Thursday';
      case 4:
        return 'Friday';
      case 5:
        return 'Saturday';
      case 6:
        return 'Sunday';
      default:
        return '';
    }
  }
}
