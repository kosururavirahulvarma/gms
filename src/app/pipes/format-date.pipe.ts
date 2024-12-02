import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true // Mark the pipe as standalone
})
export class FormatDatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length !== 8) {
      return value; // Return as-is if not in expected format
    }

    const month = value.substring(0, 2);
    const day = value.substring(2, 4);
    const year = value.substring(4);

    return `${month}/${day}/${year}`;
  }
}
