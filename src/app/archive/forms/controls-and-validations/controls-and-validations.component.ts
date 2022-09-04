import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EqualityValidator } from '../validators/equality.validator';
import { PhoneValidator } from '../validators/phone.validator';
import { CountryPhone } from '../validators/country-phone.model';
import { Observable } from 'rxjs';
import { startWith, map, filter } from 'rxjs/operators';
import { FormsService } from '../forms.service';

@Component({
  selector: 'app-controls-and-validations',
  templateUrl: './controls-and-validations.component.html',
  styleUrls: ['./controls-and-validations.component.scss']
})
export class ControlsAndValidationsComponent implements OnInit {

  validationsForm: FormGroup;

  matchingPasswordsGroup: FormGroup;
  countryPhoneGroup: FormGroup;

  countries = new Array<CountryPhone>();
  filteredCountries: Observable<Array<CountryPhone>>;

  // Form validation messages
  validationMessages = {
    requiredText: [
      { type: 'required', message: 'This field is required.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Email has an incorrect format.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Password confirmation is required.' },
      { type: 'areNotEqual', message: 'Password mismatch' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must contain 5 or more characters.' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    equal: [
      { type: 'areNotEqual', message: 'These fields should be equal.' }
    ],
    termsCheckbox: [
      { type: 'pattern', message: 'You must accept terms and conditions.' }
    ],
    minLength: [
      { type: 'required', message: 'This input is required' },
      { type: 'minlength', message: 'Min length is 5.' }
    ],
    maxLength: [
      { type: 'required', message: 'This input is required' },
      { type: 'maxlength', message: 'Max length is 10.' }
    ],
    date: [
      { type: 'required', message: 'Please select a date.' }
    ],
    minValue: [
      { type: 'min', message: 'Min value allowed is 2.' }
    ],
    maxValue: [
      { type: 'max', message: 'Max value allowed is 5.' }
    ],
    country: [
      { type: 'required', message: 'Please select your country of residence.' }
    ],
    phone: [
      { type: 'required', message: 'Phone is required.' },
      { type: 'invalidCountryPhone', message: 'Phone is incorrect for the selected country.' }
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private formsService: FormsService
  ) {}

  ngOnInit() {
    // matching passwords validation
    this.matchingPasswordsGroup = new FormGroup({
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required,
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
      ])),
      confirm_password: new FormControl('', Validators.required)
    }, (formGroup: FormGroup) => {
      return EqualityValidator.areNotEqual(formGroup);
    });

    // country & phone validation
    const country = new FormControl('', Validators.required);

    const phone = new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        PhoneValidator.invalidCountryPhone(country)
      ])
    });

    this.countryPhoneGroup = new FormGroup({ country, phone });

    this.validationsForm = this.formBuilder.group({
      requiredText: new FormControl('', Validators.required),
      optionalText: new FormControl(''),
      email: new FormControl('', Validators.compose([
        Validators.email,
        Validators.required
      ])),
      matching_passwords: this.matchingPasswordsGroup,
      equal: new FormGroup(
        {
          equal1: new FormControl('first'),
          equal2: new FormControl('firs')
        },
        (formGroup: FormGroup) => {
          return EqualityValidator.areNotEqual(formGroup);
        }
      ),
      maxLength: new FormControl('I am a ver long text', Validators.compose([
        Validators.maxLength(10),
        Validators.required
      ])),
      minLength: new FormControl('Hey!', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
      number: new FormControl('8', Validators.pattern('[0-9]*')),
      minValue: new FormControl('1', formControl => {
        const value = Number(formControl.value);
        return (value >= 2) ? undefined : { min: true };
      }),
      maxValue: new FormControl('10', formControl => {
        const value = Number(formControl.value);
        return (value <= 5) ? undefined : { max: true };
      }),
      date: new FormControl('', Validators.required),
      termsCheckbox: new FormControl(false, Validators.pattern('true')),
      country_phone: this.countryPhoneGroup
    });

    this.countryPhoneGroup.controls.country.valueChanges.subscribe(() => {
      this.countryPhoneGroup.controls.phone.markAsUntouched();
    });


    // init countries autocompleter and set the search function
    this.formsService.getCountries().subscribe(countries => {
      this.countries = countries;
      this.filteredCountries = country.valueChanges
      .pipe(
        startWith(''),
        filter(value => value !== null),
        map(value => {
          if (value.name) {
            return this.countries.filter(c => c.name.toLowerCase().includes(value.name.toLowerCase()));
          } else {
            return this.countries.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
          }
        })
      );
    });
  }

  isInvalid(controlName: string) {
    return ((this.validationsForm.get(controlName).invalid) && (this.validationsForm.get(controlName).touched));
  }

  isValid(controlName: string) {
    return ((this.validationsForm.get(controlName).valid) && (this.validationsForm.get(controlName).touched));
  }

  hasError(controlName: string, validationType: string) {
    // tslint:disable-next-line:max-line-length
    return this.validationsForm.get(controlName).hasError(validationType) && (this.validationsForm.get(controlName).dirty || this.validationsForm.get(controlName).touched);
  }

  countriesAutocompleteDisplay(country?: CountryPhone): string | undefined {
    return country ? country.name : undefined;
  }

  validateFields(): void {
    if (!this.validationsForm.valid) {
      // Mark the form and inputs as touched so the errors messages are shown
      this.validationsForm.markAsTouched();
      for (const control in this.validationsForm.controls) {
        if (this.validationsForm.controls.hasOwnProperty(control)) {
          this.validationsForm.controls[control].markAllAsTouched();
          this.validationsForm.controls[control].markAsDirty();
        }
      }
    }
  }
}
