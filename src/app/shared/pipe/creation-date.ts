import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'creationDate',
})
export class CreationDate implements PipeTransform {
  transform(data: string) {
    const dateObj = new Date(data);
    const month = ('0' + (dateObj.getMonth() + 1)).slice(-2);
    const date = ('0' + dateObj.getDate()).slice(-2);
    const year = dateObj.getFullYear();
    return `${date}.${month}.${year}`;
  }
}
