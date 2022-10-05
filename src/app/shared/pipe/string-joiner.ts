import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringJoiner',
})
export class StringJoiner implements PipeTransform {
  transform(array: Array<string>, separator: string) {
    return array.join(separator);
  }
}
