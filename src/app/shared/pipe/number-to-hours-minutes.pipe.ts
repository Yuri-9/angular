import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToHoursMinutes',
})
export class NumberToHoursMinutesPipe implements PipeTransform {
  transform(minutes: number) {
    const minLimit = 0;
    const maxLimit = 1440;

    const correctNumber =
      minutes >= minLimit && minutes <= maxLimit ? Math.floor(minutes) : 0;

    const hours = Math.floor(correctNumber / 60);
    const minutesLeft = correctNumber % 60;

    const hoursCorrect = `${hours < 10 ? '0' : ''}${hours}`;
    const minutesCorrect = `${minutesLeft < 10 ? '0' : ''}${minutesLeft}`;

    return `${hoursCorrect}:${minutesCorrect}`;
  }
}
