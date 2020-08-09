import { Pipe, PipeTransform, IterableDiffers } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {
  transform(items: any[], value: string, fieldsToSearch: string[]): any[] {
    // console.log(`items : ${items}`);
    // console.log(`values : ${value}`);
    // console.log(`fieldsToSearch : ${fieldsToSearch}`);

    // if no value return original content
    if (!value) { return items; }

    // traverse through array
    return items.filter(item => {

      // set flag
      let ret = false;

      // search by specified fields
      fieldsToSearch.filter(key => {
        if (item[key].toLowerCase().indexOf(value.toLowerCase()) >= 0) {
          ret = true;
        }
      });

      // return flag
      return ret;
    });
  }
}
