import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addressShortner'
})
export class AddressShortnerPipe implements PipeTransform {

  transform(value: String, ...args: number[]): unknown {
    let modifiedValue = value
    if(value.length > args[0]){
      modifiedValue = value.slice(0,args[0]) + '...'
    }

    return modifiedValue;
  }

}
