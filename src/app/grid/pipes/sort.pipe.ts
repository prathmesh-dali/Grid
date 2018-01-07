import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], sortBy: string, asc: boolean): any {
    return value.sort((item1, item2) => {
      if (item1[sortBy] && item2[sortBy] && item1[sortBy] > item2[sortBy]) {
        return asc ? 1 : -1;
      }else if (item1[sortBy] && item2[sortBy] && item1[sortBy] < item2[sortBy] ) {
        return asc ? -1 : 1;
      }else {
        return 0;
      }
  });
  }
}
