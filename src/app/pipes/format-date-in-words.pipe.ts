import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDateInWords',
  standalone: true
})
export class FormatDateInWordsPipe implements PipeTransform {
  transform(value: string): string {
    if (!value || value.length !== 8) {
      return value; // Return as-is if not in expected format
    }

    const monthIndex = parseInt(value.substring(0, 2), 10);
    const day = parseInt(value.substring(2, 4), 10);
    const year = value.substring(4);

    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Get ordinal suffix for the day
    const ordinalSuffix = (n: number) => {
      if (n > 3 && n < 21) return 'th'; // Covers 11th to 19th
      switch (n % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    const month = monthNames[monthIndex - 1]; // Convert month index to name
    const suffix = ordinalSuffix(day);

    return `${day}${suffix} ${month} ${year}`;
  }
}
