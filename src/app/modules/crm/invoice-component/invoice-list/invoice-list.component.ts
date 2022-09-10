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
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.scss']
})

export class InvoiceListComponent implements OnInit {
  searchValue: any;
  invoiceList: any[] = [];
  invoiceListDataSource = new MatTableDataSource(this.invoiceList);
  columns: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;
  @ViewChild('HelpDialog', { static: false }) HelpDialog!: TemplateRef<any>;

  constructor(private crmservices: CrmService, private dialog: MatDialog, private router: Router, private financeService: FinanceService) {
    this.columns = ["invNo", "invDate", "invName", "invDetails", "invAmt", "Actions"];
  }

  ngOnInit(): void {
    this.financeService.getAllSales().subscribe((res: any) => {
      this.invoiceList = res.recordset;
      this.invoiceListDataSource = new MatTableDataSource(this.invoiceList);
      this.invoiceListDataSource.sort = this.sort;
      this.invoiceListDataSource.paginator = this.paginator;
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

  quickInvoiceSearch() {
    this.invoiceListDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  public gotoInvoiceDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

  viewHelp() {
    let dialogRef = this.dialog.open(this.HelpDialog);
  }

}
