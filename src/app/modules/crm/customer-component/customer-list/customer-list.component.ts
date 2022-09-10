import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
//import { ChartOptions, ChartType, ChartDataset } from 'chart.js';
//import { Color, Label } from 'ng2-charts';
import * as moment from 'moment';
import { FinanceService } from 'src/app/services/finance/finance.service';
import * as ExcelJS from  'exceljs/dist/exceljs.min.js';
import * as FileSaver from 'file-saver';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing.service';
const EXCEL_EXTENSION = '.xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
//import * as XLSX from 'xlsx';
import { Router } from "@angular/router";

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  columns: any[];
  columnCustomerDefs: any[];
  columnCustomer: any[];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  currentYear = new Date().getFullYear()
  searchValue: any;
  customerlist: any[] = [];
  CustPartyList: any[] = [];
  CustMemberList: any[] = [];
  CustInvoiceList: any[] = [];
  CustAgreementList: any[] = [];
  AccountsCategoryList: any[] = [];
  AccountsTypeList: any[] = [];
  BranchArr: any[] = [];
  custExcelArr: any[] = [];

  rowStyle!: { background: string; };
  sortingOrder:any;
  mAccountDetails: any = {
    Cust_name: "",
    mOpbal: 0,
    mDebit: 0,
    mCredit: 0
  }
  
  customerlistDataSource = new MatTableDataSource(this.customerlist);  

  constructor(private financeservice: FinanceService, private snackbar: MatSnackBar, private dataSharing: DataSharingService, private router: Router){
    this.columnCustomer = ["PCODE", "CUST_NAME", "ADD1", "ADD2", "TAX_1_NO", "PHONE1", "Actions"];
  }

  onGridCustomerReady(params: any){ 
    this.financeservice.getCustomerList(String(this.currentYear)).subscribe((res: any) =>  {
      this.customerlist=res.recordset;
      params.api.setRowData(this.customerlist);
    }, (error: any) => {
      console.log(error);
    });
  }

  getCustmerParty(pcode:string) {
    this.financeservice.getCustomerParty(pcode,String(this.currentYear)).subscribe((res: any) => {
      this.CustPartyList = res.recordset;
    }, (err: any) => {
      console.log(err);
    })
  }

  getCustomerMember(pcode:string) {
    this.financeservice.getCustomerMemner(pcode,String(this.currentYear)).subscribe((res: any) => {
      this.CustMemberList = res.recordset;
    }, (err: any) => {
      console.log(err);
    })
  }
  
  getAccountsCategoryData() {
    this.financeservice.getAccountsCategory().subscribe((res: any) =>  {
      this.AccountsCategoryList=res.recordset;
    }, (error: any) => {
      console.log(error);
    });
  }

  getAccountsTypeData() {
    this.financeservice.getAccountsType().subscribe((res: any) =>  {
      this.AccountsTypeList=res.recordset;
    }, (error: any) => {
      console.log(error);
    }); 
  }

  getBranchData() {
    this.financeservice.getBranch().subscribe((res: any) =>  {
      this.BranchArr=res.recordset;
    }, (error: any) => {
      console.log(error);
    }); 
  }
  
  getCustmerInvoices(pcode: string,sfyear: string,efyear: string) {
    this.financeservice.getCustomerInvoices(pcode, sfyear,efyear).subscribe((res: any) => {
      this.CustInvoiceList = res.recordset;
      /*this.varInvChartLabels = [];
      this.varInvChartValues = [];
      for(let i=0; i<this.CustInvoiceList.length; i++) {
        var tempChartLbl: string = this.CustInvoiceList[i].INV_NO;
        var tempChartVal: number = this.CustInvoiceList[i].INV_AMOUNT;
        this.varInvChartLabels.push(tempChartLbl);
        this.varInvChartValues.push(tempChartVal);
      }*/
    }, (err: any) => {
      console.log(err);
    })
  }
  
  getCustomerExcel(){
    this.financeservice.getCustomerForExcel().subscribe((res:any) => {
      this.custExcelArr = res.recordset
      console.log(res.recordset)
    },(err: any) =>{
      console.log(err)
    })
  }

  public exportAsExcelFile(
    reportHeading: string,
    reportSubheading: string,
    headerArray: any[],
    excelfileName: string,
    sheetname:string
    
    ) {
      const data = this.custExcelArr;
      const header = headerArray;
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'ifasoft';
      workbook.lastModifiedBy = 'ifasoft';
      workbook.created = new Date();
      workbook.modified = new Date();
      const worksheet = workbook.addWorksheet(sheetname);

      worksheet.addRow([]);
      worksheet.mergeCells('A1:' + this.numToAlpha(header.length - 1) + '1');
      worksheet.getCell('A1').value = reportHeading;
      worksheet.getCell('A1').alignment = {horizontal: 'center'};
      worksheet.getCell('A1').font = {name:'Times New Roman',size:20 ,bold:false};

      if (reportSubheading !== ''){
        worksheet.addRow([]);
      worksheet.mergeCells('A2:' + this.numToAlpha(header.length - 1) + '2');
      worksheet.getCell('A2').value = reportSubheading;
      worksheet.getCell('A2').alignment = {horizontal: 'center'};
      worksheet.getCell('A2').font = {size:14 ,bold:false};
      
      }

      worksheet.addRow([]);

      const HeaderRow = worksheet.addRow(header);

      HeaderRow.eachCell((cell,index) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF00'},
          bgColor: { argb: 'FF0000FF'}
        };
        cell.border = {top: {style: 'thin'},left: {style: 'thin'},bottom: {style: 'thin'},right: {style: 'thin'}};
        cell.font = {name: 'Times New Roman', size: 12, bold: false};
        cell.alignment = {horizontal: 'center'};
        worksheet.getColumn(1).width = 15;
        worksheet.getColumn(2).width = 40;
        worksheet.getColumn(3).width = 22;
        worksheet.getColumn(4).width = 15;
        worksheet.getColumn(5).width = 32;
        worksheet.getColumn(6).width = 32;
        worksheet.getColumn(7).width = 32;
        worksheet.getColumn(8).width = 36;
        worksheet.getColumn(9).width = 21;
        worksheet.getColumn(10).width = 21;
        // worksheet.getColumn(index).width = header[index - 1].length < 20 ? 20 : header[index - 1].length;

      });

      let columnsArray: any[];
      for (const key in this.custExcelArr){
        if(this.custExcelArr.hasOwnProperty(key)){
          columnsArray = Object.keys(this.custExcelArr[key]);
        }
      }

      data.forEach((element: any) => {
        const eachrow = [];
        columnsArray.forEach((column) => {
          eachrow.push(element[column]);
        });

        if(element.isDeleted === 'Y'){
          const deleteRow = worksheet.addRow(eachrow);
          deleteRow.eachCell((cell) => {
            cell.font = {name: 'Times New Roman', family: 4, size:11, bold: false, strike: true};
          });
        } else {
          worksheet.addRow(eachrow);
        }
      });

      workbook.xlsx.writeBuffer().then((data: ArrayBuffer) => {
        const blob = new Blob([data], {type: EXCEL_TYPE});
        FileSaver.saveAs(blob, excelfileName + EXCEL_EXTENSION);
      })
  }


  numToAlpha(num: number) {
    let alpha = '';
    for (; num >=0; num = parseInt((num / 26).toString(),10)-1){
      alpha = String.fromCharCode(num %  26 + 0x41) + alpha;
    }
    return alpha;
  }
  
  setReportData(apiUrl: string, reportType: string){
    const reportData = {
      apiUrl: apiUrl,
      reportType: reportType
    };
    this.dataSharing.setData(reportData);
  }

  exportTOexcel(){
    this.exportAsExcelFile('AL Bander Hotel & Resort','All Customer List',this.columns,'Customer-Report','sheet1')
  }

  ngOnInit(): void {
    this.getAccountsCategoryData();
    this.getAccountsTypeData();
    this.getBranchData();
    this.getCustomerExcel();

      this.financeservice.getCustomerList(String(this.currentYear)).subscribe((res: any) => {
        this.customerlist = res.recordset;
        this.customerlistDataSource = new MatTableDataSource(this.customerlist);
        this.customerlistDataSource.sort = this.sort;
        this.customerlistDataSource.paginator = this.paginator;
      }, (error: any) => {
        console.log(error);
      });

  }

  /*exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }*/

  quickPartyrSearch() {
    this.customerlistDataSource.filter = this.searchValue.trim().toLowerCase();
  }


  public gotoCustomerDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }
}
