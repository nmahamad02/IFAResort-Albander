import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-regular-tables',
  templateUrl: './regular-tables.component.html',
  styleUrls: [
    './regular-tables.component.scss'
  ]
})
export class RegularTablesComponent {

  displayedColumns: string[] = ['id', 'name', 'country', 'city', 'birthday', 'age', 'salary'];
  dataSource: any;

  constructor(private route: ActivatedRoute) {
    // tslint:disable-next-line:no-string-literal
    this.dataSource = route.snapshot.data['tableData'];
  }

}
