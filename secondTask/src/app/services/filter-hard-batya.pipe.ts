import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterHardBatya'
})
export class FilterHardBatyaPipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): any[] {
    return value.filter(batya => batya.isBatya && batya.name.length < 4);
  }

}
