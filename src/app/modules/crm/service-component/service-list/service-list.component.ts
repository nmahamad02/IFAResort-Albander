import {ElementRef, TemplateRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CrmService } from 'src/app/services/crm/crm.service';
import { FinanceService } from 'src/app/services/finance/finance.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import * as XLSX from 'xlsx';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.scss']
})
export class ServiceListComponent implements OnInit {
  searchValue: any;
  serviceList: any[] = [];
  serviceListDataSource = new MatTableDataSource(this.serviceList);
  columns: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;
  @ViewChild('HelpDialog', { static: false }) HelpDialog!: TemplateRef<any>;

  constructor(private crmservices: CrmService, private router: Router, private financeService: FinanceService, private dialog: MatDialog) {
    this.columns =  ['ServiceID', 'servicedesc', 'memberprice', 'Actions'];
  }

  ngOnInit(): void {
    this.financeService.getAllService().subscribe((res: any) => {
      this.serviceList = res.recordset;
      this.serviceListDataSource = new MatTableDataSource(this.serviceList);
      this.serviceListDataSource.sort = this.sort;
      this.serviceListDataSource.paginator = this.paginator;
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

  quickServiceSearch() {
    this.serviceListDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  viewHelp() {
    let dialogRef = this.dialog.open(this.HelpDialog);
  }

  public gotoServiceDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

}
