import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberToBoolean'
})
export class NumberToBooleanPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): any {
    if (value == 0 || 1) {
      return value === 0 ? 'False' : 'True'
    }
  }

}
