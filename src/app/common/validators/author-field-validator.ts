import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

const LATIN_LETTERS_AND_NUMBERS_REGEXP = /^$|^[a-z0-9- ]+$/i;

export function authorFieldValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const error = !LATIN_LETTERS_AND_NUMBERS_REGEXP.test(control.value);

    return error ? { string: { value: `Allow only latin letters and numbers` } } : null;
  };
}
