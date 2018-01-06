import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(data: any[], columns: string[], text: string[]): any[] {
    const value = Object.assign([], data);
    if (columns.length === 0) {
      return value;
    } else {
      return this.transform(value, columns.slice(1), text.slice(1)).filter((val) => val[columns[0]].includes(text[0]));
    }
  }

}
