import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'clipFilter',
  pure: false
})
@Injectable()
export class ClipFilterPipe implements PipeTransform {
  transform(values: any[], args: any[]): any {
    return values.filter(value => {
      for (let i = 0; i < args.length; i++) {
        if (value[args[i][0]] !== args[i][1]) {
          return false;
        }
      }
      return true;
    });
  }
  // transform(items: any[], filter: Clip): any {
  //     if (!items || !filter) {
  //         return items;
  //     }
  //     // filter items array, items which match and return true will be
  //     // kept, false will be filtered out
  //     return items.filter(item => item.title.indexOf(filter) !== -1);
  // }
}
