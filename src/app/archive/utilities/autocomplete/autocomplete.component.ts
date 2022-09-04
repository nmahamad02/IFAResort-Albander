import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CountryPhone } from 'src/app/archive/forms/validators/country-phone.model';
import { UtilitiesService } from '../utilities.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  selectedCountry: FormControl;
  selectedFruit: FormControl;
  selectedUser: FormControl;
  selectedTaskOwner: FormControl;

  countries = new Array<CountryPhone>();
  filteredCountries: Observable<CountryPhone[]>;
  filteredTaskOwners: Observable<{name: string, role: string, picture: string}[]>;
  // tslint:disable-next-line:max-line-length
  fruits = ['Apple', 'Watermelon', 'Orange', 'Pear', 'Cherry', 'Strawberry', 'Nectarine', 'Grape', 'Mango', 'Blueberry', 'Pomegranate', 'Plum', 'Banana', 'Raspberry', 'Mandarin', 'Jackfruit', 'Papaya', 'Kiwi', 'Pineapple', 'Lime', 'Lemon', 'Apricot', 'Grapefruit', 'Melon', 'Coconut', 'Avocado', 'Peach'];

  // tslint:disable-next-line:max-line-length
  users: {name: string, role: string, picture: string}[] = [
    {name: 'Francesca Metts', role: 'Designer', picture: '/assets/imgs/users/user-1.jpeg'},
    {name: 'Malcolm Quaday', role: 'Developer', picture: '/assets/imgs/users/user-2.jpeg'},
    {name: 'Elizabeth Hurton', role: 'Tester', picture: '/assets/imgs/users/user-3.jpeg'},
    {name: 'Albert Pollock', role: 'Project Manager', picture: '/assets/imgs/users/user-4.jpeg'},
    {name: 'John Marston', role: 'Team Leader', picture: '/assets/imgs/users/user-5.jpeg'},
    {name: 'Sara Williams', role: 'Business Analyst', picture: '/assets/imgs/users/user-6.jpeg'}
  ];

  constructor(private utilitiesService: UtilitiesService) {
    this.selectedCountry = new FormControl('');
    this.selectedFruit = new FormControl('');
    this.selectedUser = new FormControl('');
    this.selectedTaskOwner = new FormControl('');
  }

  ngOnInit() {
    // init countries autocompleter and set the search function
    this.utilitiesService.getCountries().subscribe(countries => {
      this.countries = countries;
      this.filteredCountries = this.selectedCountry.valueChanges
      .pipe(
        startWith(''),
        map(value => {
          return this.countries.filter(c => c.name.toLowerCase().includes(value.toLowerCase()));
        })
      );
    });

    // init material users autocompleter and set the search function
    this.filteredTaskOwners = this.selectedTaskOwner.valueChanges
     .pipe(
       startWith(''),
       map(value => {
         return this.users.filter(c => c.name.toLowerCase().indexOf(value.toLowerCase()) === 0);
       })
     );
  }

  searchFruits = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term === '' ? []
        : this.fruits.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  }

  fruitsFormatter = (fruit: string) => {
    return fruit.toUpperCase();
  }

  searchUsers = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      map(term => term === '' ? []
        : this.users.filter(u => u.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );
  }

  usersFormatter = (user: {name: string, picture: string}) => {
    return user.name;
  }

}
