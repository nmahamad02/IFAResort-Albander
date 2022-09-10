import {ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CrmService } from 'src/app/services/crm/crm.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import * as XLSX from 'xlsx';
import { Router } from "@angular/router";

@Component({
  selector: 'app-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {
  searchValue: any;
  contactList: any[] = [];
  contactListDataSource = new MatTableDataSource(this.contactList);
  columns: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  constructor(private crmservices: CrmService, private router: Router) {
    this.columns = ["PARTY_ID", "NAME", "ADD1", "ADD2", "ADD3", "PHONE1", "Actions"];
  }

  ngOnInit(): void {
    this.crmservices.getParty().subscribe((res: any) => {
      this.contactList = res.recordset;
      this.contactListDataSource = new MatTableDataSource(this.contactList);
      this.contactListDataSource.sort = this.sort;
      this.contactListDataSource.paginator = this.paginator;
    }, (error: any) => {
      console.log(error);
    });
  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  quickPartyrSearch() {

    this.contactListDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  public gotoContactDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
     
    });
  }

}
