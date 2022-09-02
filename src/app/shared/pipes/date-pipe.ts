import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({ name: 'datePipe' })
export class datePipe implements PipeTransform {
  transform(date: Date | string, day: number, format: string = 'dd-MM-yyyy'): string {
    date = new Date(date);
    return new DatePipe('pt-BR').transform(date, 'dd/MM/yyyy HH:mm:ss')!;
  }
}
