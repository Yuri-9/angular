import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class Duration implements PipeTransform {
  readonly minLimit = 0;
  readonly maxLimit = 1440;
  readonly numberTen = 10;

  transform(minutes: number): string {
    const correctNumber = minutes >= this.minLimit && minutes <= this.maxLimit ? Math.floor(minutes) : 0;

    const hours = Math.floor(correctNumber / 60);
    const minutesLeft = correctNumber % 60;

    const hoursCorrect = `${hours < this.numberTen ? '0' : ''}${hours}`;
    const minutesCorrect = `${minutesLeft < this.numberTen ? '0' : ''}${minutesLeft}`;

    return `${hoursCorrect}:${minutesCorrect}`;
  }
}
