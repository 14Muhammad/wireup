import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ellipses'
})
export class EllipsesPipe implements PipeTransform {

  transform(value: string, maxLength: number): string {
    if(value.length <= maxLength)
      return value;
    else
      return value.substring(0,maxLength) + "...";
  }

}
