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
  selector: 'app-agreement-list',
  templateUrl: './agreement-list.component.html',
  styleUrls: ['./agreement-list.component.scss']
})
export class AgreementListComponent implements OnInit {
  searchValue: any;
  agreementList: any[] = [];
  agreementListDataSource = new MatTableDataSource(this.agreementList);
  columns: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;
  @ViewChild('HelpDialog', { static: false }) HelpDialog!: TemplateRef<any>;

  constructor(private crmservices: CrmService, private router: Router, private financeService: FinanceService, private dialog: MatDialog) {
    this.columns = ["AGR_NO", "CUST_NAME", "SONO", "AGR_DATE", "EXPIRY_DATE", "STATUS", "Actions"];
  }

  ngOnInit(): void {
    this.financeService.getAllAgreements().subscribe((res: any) => {
      this.agreementList = res.recordset;
      for (let i = 0; i < this.agreementList.length; i++) {
        if (this.agreementList[i].IS_TERMINATED === 'I') {
          this.agreementList[i].IS_TERMINATED = 'Inactive';
        }
        else if (this.agreementList[i].IS_TERMINATED === 'A') {
          this.agreementList[i].IS_TERMINATED = 'Active';
        }
      }
      this.agreementListDataSource = new MatTableDataSource(this.agreementList);
      this.agreementListDataSource.sort = this.sort;
      this.agreementListDataSource.paginator = this.paginator;
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

  quickAgreementSearch() {
    this.agreementListDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  viewHelp() {
    let dialogRef = this.dialog.open(this.HelpDialog);
  }

  public gotoAgreementDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

}
