import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-extended-tables',
  templateUrl: './extended-tables.component.html',
  styleUrls: [
    './extended-tables.component.scss'
  ]
})
export class ExtendedTablesComponent {

  displayedColumns: string[] = ['picture', 'name', 'status', 'progress', 'renewal_date', 'subscription', 'actions'];
  dataSource: any;

  constructor(private route: ActivatedRoute) {
    // tslint:disable-next-line:no-string-literal
    this.dataSource = route.snapshot.data['tableData'];
  }

}
