import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBatya'
})
export class FilterBatyaPipe implements PipeTransform {

  transform(value: any[], ...args: unknown[]): any[] {
    return value.filter(batya => batya.isBatya);
  }

}
