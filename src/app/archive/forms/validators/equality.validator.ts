import { FormControl, FormGroup } from '@angular/forms';

// This validator checks if all the controls from a FormGroup are equal.

export class EqualityValidator {
  // If our validation fails, we return an object with a key for the error name and a value of true.
  // Otherwise, if the validation passes, we simply return null because there is no error.
  static areNotEqual(formGroup: FormGroup) {
    let value: any;
    let valid = true;

    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = formGroup.controls[key] as FormControl;

        if (value === undefined) {
          value = control.value;
        } else {
          if (value !== control.value) {
            valid = false;
            break;
          }
        }
      }
    }

    if (valid) {
      return null;
    }

    return {
      areNotEqual: true
    };
  }
}
