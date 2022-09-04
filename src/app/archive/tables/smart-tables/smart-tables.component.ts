import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MatPaginator,
  MatSort,
  MatTableDataSource,
  MatTable
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute } from '@angular/router';

export interface RowData {
  picture: string;
  name: string;
  country: string;
  interests: string;
  subscribed: string;
  age: number;
  status: string;
}

@Component({
  selector: 'app-smart-tables',
  templateUrl: './smart-tables.component.html',
  styleUrls: [
    './smart-tables.component.scss'
  ]
})

export class SmartTablesComponent implements OnInit {

  displayedColumns: string[] = ['select', 'picture', 'name', 'country', 'interests', 'subscribed', 'age', 'status'];
  dataSource: MatTableDataSource<RowData>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('table', {static: true}) table: MatTable<RowData>;
  selection = new SelectionModel<RowData>(true, []);

  // Data from the resolver
  originalData = [];

  constructor(private route: ActivatedRoute) {
    // tslint:disable-next-line:no-string-literal
    this.originalData = route.snapshot.data['tableData'];
    this.dataSource = new MatTableDataSource(this.originalData);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    // define a custom sort for the date field
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'subscribed': return new Date(item.subscribed);
        default: return item[property];
      }
    };
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
   this.isAllSelected() ?
     this.selection.clear() :
     this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
