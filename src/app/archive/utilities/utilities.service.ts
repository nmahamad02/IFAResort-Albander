import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CountryPhone } from '../forms/validators/country-phone.model';

@Injectable()
export class UtilitiesService {

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Array<CountryPhone>> {
    // List of countries for the autocomplete
    return this.http.get<Array<CountryPhone>>('/assets/data/countries.json')
    .pipe(
      map((countries) => {
        return countries.map(c => new CountryPhone(c.iso, c.name));
      })
    );
  }
}
