import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currencyformat'
})
export class CurrencyFormatPipe implements PipeTransform {

  transform(value: number, currencyCode: string = 'BRL', digits?: string): string {
    if (!value) {
      return '';
    }

    let currencyPipe: CurrencyPipe = new CurrencyPipe('pt-BR');
    return currencyPipe.transform(value, currencyCode, digits)!;
  }

}
