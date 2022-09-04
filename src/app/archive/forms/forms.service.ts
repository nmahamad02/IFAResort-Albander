import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CountryPhone } from './validators/country-phone.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class FormsService {

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Array<CountryPhone>> {
    // List of countries for the forms
    return this.http.get<Array<CountryPhone>>('/assets/data/countries.json')
    .pipe(
      map((countries) => {
        return countries.map(c => new CountryPhone(c.iso, c.name));
      })
    );
  }

  getSkills(): Array<string> {
    return [
      'Content Marketing',
      'Web Design',
      'SEO',
      'Digital Marketing'
    ];
  }
}
