import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateNotBeyondDeadlineValidator(deadline: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const selectedDate = control.value;
    if (selectedDate && new Date(selectedDate) > deadline) {
      return { dateExceedsDeadline: true }; // Validation error key
    }
    return null; // Validation passes
  };
}