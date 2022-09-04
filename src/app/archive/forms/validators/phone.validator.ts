import { AbstractControl, ValidatorFn } from '@angular/forms';
import libphonenumber from 'google-libphonenumber';

export class PhoneValidator {

  // Validate if a phone number belongs to a certain country.
  // If our validation fails, we return an object with a key for the error name and a value of true.
  // Otherwise, if the validation passes, we simply return null because there is no error.

  static invalidCountryPhone = (countryControl: AbstractControl): ValidatorFn => {
    let subscribe = false;

    return (phoneControl: AbstractControl): {[key: string]: boolean} => {
      if (!subscribe) {
        subscribe = true;
        countryControl.valueChanges.subscribe(() => {
          phoneControl.updateValueAndValidity();
        });
      }

      if (phoneControl.value !== '') {
        try {
          const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
          const phoneNumber = '' + phoneControl.value + '';
          const region = countryControl.value.iso;
          const parsedNumber = phoneUtil.parse(phoneNumber, region);
          const isValidNumber = phoneUtil.isValidNumber(parsedNumber);

          if (isValidNumber) {
            return null;
          }
        } catch (e) {
          return {
            invalidCountryPhone: true
          };
        }

        return {
          invalidCountryPhone: true
        };
      } else {
        return null;
      }
    };
  }
}
