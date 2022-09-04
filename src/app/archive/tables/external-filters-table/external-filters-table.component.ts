import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatChipInputEvent
} from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';


export interface RowData {
  id: string;
  product: string;
  category: string;
  location: string;
  customer: string;
  price: number;
  date: string;
  status: string;
}

@Component({
  selector: 'app-external-filters-table',
  templateUrl: './external-filters-table.component.html',
  styleUrls: [
    './external-filters-table.component.scss'
  ],
  providers: [DatePipe]
})

export class ExternalFiltersTableComponent implements OnInit {
  // Filters for the smart table
  filtersForm: FormGroup;
  filtersVisible = true;
  toggleFiltersLabel = 'Hide filters';

  recentOrdersTableDisplayedColumns: string[] = ['id', 'product', 'category', 'location', 'customer', 'price', 'date', 'status'];
  recentOrdersTableDataSource: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  // Data from the resolver
  originalData = [];

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  categories = [];

  constructor(
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) {
    // tslint:disable-next-line:no-string-literal
    this.originalData = route.snapshot.data['tableData'];
    this.recentOrdersTableDataSource = new MatTableDataSource<RowData>(this.originalData);

    this.filtersForm = new FormGroup({
      search: new FormControl(''),
      categories: new FormControl([[]]),
      date: new FormControl('')
    });
    this.filtersForm.valueChanges.subscribe(form => this.applyFilters(form));
  }

  ngOnInit() {
    this.recentOrdersTableDataSource.paginator = this.paginator;

    // define a custom sort for the date field
    this.recentOrdersTableDataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'date': return new Date(item.date);
        default: return item[property];
      }
    };
    this.recentOrdersTableDataSource.sort = this.sort;
  }


  search(filterValue: string) {
    this.recentOrdersTableDataSource.filter = filterValue.trim().toLowerCase();

    if (this.recentOrdersTableDataSource.paginator) {
      this.recentOrdersTableDataSource.paginator.firstPage();
    }
}

  // Run the filters for the table
  applyFilters(form): void {

    const date = form.date ? new Date(form.date.year, (form.date.month - 1), form.date.day) : '';
    // Note: JavaScript counts months from 0 to 11.

    const results = [];
    this.originalData.forEach(row => {
      const filterDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      if (
        (this.categoryContains(row.category, this.categories)) &&
        ((form.date === '') || (new Date(filterDate) > new Date(row.date)))
      ) {
        results.push(row);
      }
    });
    this.recentOrdersTableDataSource.data = results;
  }

  // Show or hide the available filters
  toggleFilters(): void {
    this.filtersVisible = !this.filtersVisible;
    this.toggleFiltersLabel = this.filtersVisible ? 'Hide filters' : 'Show filters';
  }

  // Reset all the filters values
  clearFilters(): void {
    this.filtersForm.reset({
      search: '',
      categories: [],
      date: ''
    });

    this.categories = [];

    this.resetDatePicker();

    this.search('');
    this.applyFilters(this.filtersForm.value);
  }

  resetDatePicker(): void {
    this.filtersForm.controls.date.reset('');
  }

  // Check if a string contains another
  stringContains(string1: string, string2: string): boolean {
    return (string1.toLowerCase().indexOf(string2.toLowerCase()) > -1);
  }

  // // Check if a category contains a string
  categoryContains(rowCategory: string, categories: any[]): boolean {
    for (const category of categories) {
      if (this.stringContains(rowCategory, category)) {
        return true;
      }
    }
    return (categories.length === 0);
  }

  // Category tags
  addCategory(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our Category
    if ((value || '').trim()) {
      this.categories.push(value.trim());
      this.applyFilters(this.filtersForm.value);
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  removeCategory(interest: string): void {
    const index = this.categories.indexOf(interest);
    if (index >= 0) {
      this.categories.splice(index, 1);
      this.applyFilters(this.filtersForm.value);
    }
  }

}
