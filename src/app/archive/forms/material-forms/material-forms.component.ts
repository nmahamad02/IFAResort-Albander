import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UsernameValidator } from '../validators/username.validator';
import { PhoneValidator } from '../validators/phone.validator';
import { CountryPhone } from '../validators/country-phone.model';
import { FormsService } from '../forms.service';
import { ParentErrorStateMatcher } from '../validators/parent-error-state-matcher';
import { EqualityValidator } from '../validators/equality.validator';

@Component({
  selector: 'app-material-forms',
  templateUrl: './material-forms.component.html',
  styleUrls: ['./material-forms.component.scss']
})

export class MaterialFormsComponent implements OnInit {
  userDetailsForm: FormGroup;
  accountDetailsForm: FormGroup;

  matchingPasswordsGroup: FormGroup;
  countryPhoneGroup: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  genders = [
    'Male',
    'Female',
    'Other'
  ];

  countries = new Array<CountryPhone>();

  validationMessages = {
    fullname: [
      { type: 'required', message: 'Full name is required.' }
    ],
    bio: [
      { type: 'maxlength', message: 'Your bio cannot be more than 256 characters long.' },
    ],
    gender: [
      { type: 'required', message: 'Please select your gender.' },
    ],
    birthday: [
      { type: 'required', message: 'Please select your birth date.' },
    ],
    phone: [
      { type: 'required', message: 'Phone is required.' },
      { type: 'invalidCountryPhone', message: 'Phone is incorrect for the selected country.' }
    ]
  };

  accountValidationMessages = {
    username: [
      { type: 'required', message: 'Username is required.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
      { type: 'usernameNotAvailable', message: 'Your username is already taken.' }
    ],
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'email', message: 'Enter a valid email.' }
    ],
    confirm_password: [
      { type: 'required', message: 'Password confirmation is required.' },
      { type: 'areNotEqual', message: 'Password mismatch' }
    ],
    password: [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ],
    terms: [
      { type: 'pattern', message: 'You must accept terms and conditions' }
    ]
  };

  constructor(private formsService: FormsService) {
    this.formsService.getCountries().subscribe(countries => {
      this.countries = countries;
    });
  }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
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
    const country = new FormControl(null, Validators.required);

    const phone = new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        PhoneValidator.invalidCountryPhone(country)
      ])
    });

    this.countryPhoneGroup = new FormGroup({ country, phone });

    // user details form validations
    this.userDetailsForm = new FormGroup({
      fullname: new FormControl('', Validators.required),
      bio: new FormControl('', Validators.maxLength(256)),
      birthday: new FormControl('', Validators.required),
      gender: new FormControl(),
      country_phone: this.countryPhoneGroup
    });


    // user links form validations
    this.accountDetailsForm = new FormGroup({
      username: new FormControl('', Validators.compose([
       UsernameValidator.usernameNotAvailable,
       Validators.maxLength(25),
       Validators.minLength(5),
       Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]+$'),
       Validators.required
      ])),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.email
      ])),
      matching_passwords: this.matchingPasswordsGroup,
      terms: new FormControl(false, Validators.pattern('true'))
    });

    this.countryPhoneGroup.controls.country.valueChanges.subscribe(() => {
      this.countryPhoneGroup.controls.phone.markAsUntouched();
    });
  }

  onSubmitAccountDetails(value) {
    console.log(value);
  }

  onSubmitUserDetails(value) {
    console.log(value);
  }
}
