import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import {ElementRef, ViewChild } from '@angular/core';
import { FinanceService } from 'src/app/services/finance/finance.service';
import * as ExcelJS from  'exceljs/dist/exceljs.min.js';
import * as FileSaver from 'file-saver';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  public custForm: FormGroup;
  public balForm: FormGroup;
  currentYear = new Date().getFullYear()
  searchValue: any;
  customerlist: any[] = [];
  custPartyList: any[] = [];
  custMemberList: any[] = [];
  custInvoiceList: any[] = [];
  custAgreementList: any[] = [];
  AccountsCategoryList: any[] = [];
  AccountsTypeList: any[] = [];
  custExcelArr: any[] = [];
  sfyear: string = '01-01-' + this.currentYear.toString();
  efyear: string = '31-12-' + this.currentYear.toString();

  rowStyle!: { background: string; };
  sortingOrder:any;
  
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  varpcode:string = ""
  opbalChartBool: boolean = false;
  
  contactListDataSource = new MatTableDataSource(this.custPartyList);
  memberListDataSource = new MatTableDataSource(this.custMemberList);
  invoiceListDataSource = new MatTableDataSource(this.custInvoiceList);

  columns: any[];
  contactsColumns = ["PARTY_ID", "NAME", "ADD1", "ADD2", "ADD3", "PHONE1", "Actions"];
  memberColumns = ["MemberNo", "NAME", "DEPT_NAME", "MEMBTYPE", "Actions"];
  invoiceColumns = ["invNo", "invDate", "invDetails", "invAmt", "Actions"];

  constructor(private financeservice: FinanceService, private snackbar: MatSnackBar, private dataSharing: DataSharingService, private route: ActivatedRoute, private router: Router){
    this.custForm = new FormGroup({
      pcode: new FormControl('', [ Validators.required]),
      cname: new FormControl('', [ Validators.required]),
      cStatus: new FormControl('', [ Validators.required]),
      cAccountCategory: new FormControl('', [ Validators.required]),
      cType: new FormControl('', [ Validators.required]),
      cCR: new FormControl('', [ Validators.required]),
      cTaxNo: new FormControl('', [ Validators.required])
    });
  }

  newForm() {
    const utc = new Date;
    const pcode = this.formatPcode(utc);
    this.customerlist = [];
    this.custPartyList = [];
    this.custMemberList = [];
    this.custInvoiceList = [];
    this.custForm = new FormGroup({
      pcode: new FormControl(pcode, [ Validators.required]),
      cname: new FormControl('', [ Validators.required]),
      cStatus: new FormControl('', [ Validators.required]),
      cAccountCategory: new FormControl('', [ Validators.required]),
      cType: new FormControl('', [ Validators.required]),
      cCR: new FormControl('', [ Validators.required]),
      cTaxNo: new FormControl('', [ Validators.required])
    });
  }

  
  formatPcode(date: any) {
    var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear(), hour = d.getHours(), min = d.getMinutes(), sec = d.getSeconds();

    if (day.length < 2) {
      day = '0' + day;
    } 
    if (month.length < 2) {
      month = '0' + month;
    }
    return [day + min + sec];
  }

  refreshForm(){
    this.customerlist = [];
    this.custPartyList = [];
    this.custMemberList = [];
    this.custInvoiceList = [];
    this.custForm = new FormGroup({
      pcode: new FormControl('', [ Validators.required]),
      cname: new FormControl('', [ Validators.required]),
      cStatus: new FormControl('', [ Validators.required]),
      cAccountCategory: new FormControl('', [ Validators.required]),
      cType: new FormControl('', [ Validators.required]),
      cCR: new FormControl('', [ Validators.required]),
      cTaxNo: new FormControl('', [ Validators.required])
    });
  }

  getCustmerDetails(pcode: any){
    this.financeservice.getCustomerBypcode(pcode).subscribe((res:any) => {
      this.selectCustomer(res.recordset[0])
    },(err: any)=>{
      console.log(err);
    })
  }

  selectCustomer(data: any){
    this.custForm.patchValue({
      pcode: data.PCODE,
      cname: data.CUST_NAME,
      cStatus: data.STATUS,
      cAccountCategory: data.ACCOUNT_CATEGORY_CD,
      cType: data.ACCOUNT_TYPE_CD,
      cCR: data.CR_CPR,
      cTaxNo: data.TAX_1_NO  
    });
    this.varpcode = data.PCODE;
    this.getCustmerParty(this.varpcode);
    this.getCustmerInvoices(this.varpcode,this.sfyear,this.efyear);
    this.getCustomerMember(this.varpcode);
    this.getAggrementDetails(this.varpcode);
  }

  submitForm(){
    const data = this.custForm.value
    this.financeservice.getCustomerBypcode(data.pcode).subscribe((res: any) => {
      this.financeservice.updateOPbalDeatils(data.cname,data.cAccountCategory,data.cStatus,data.cType,data.cCR,data.cTaxNo,data.pcode)
      this.snackbar.open(data.pcode + " Updated Successfully", "close", {
        duration: 10000,
        verticalPosition: 'top',
        panelClass: ['sbBg']
      });
    },(err:any) =>{
      this.financeservice.postOpbalDetails(data.pcode,data.cname,data.cAccountCategory,data.cType,data.cCR,data.cTaxNo,data.cStatus,'2022')
      this.snackbar.open( data.pcode + " inserted Successfully", "close", {
        duration: 10000,
        verticalPosition: 'top',
        panelClass: ['sbBg']
      });
    })
  }

  getCustmerParty(pcode:string) {
    this.financeservice.getCustomerParty(pcode, String(this.currentYear)).subscribe((res: any) => {
      this.custPartyList = res.recordset;
      console.log(this.custPartyList);
      this.contactListDataSource = new MatTableDataSource(this.custPartyList);
      this.contactListDataSource.sort = this.sort;
      this.contactListDataSource.paginator = this.paginator;
    }, (err: any) => {
      console.log(err);
    })
  }

  getCustomerMember(pcode:string) {
    this.financeservice.getCustomerMemner(pcode, String(this.currentYear)).subscribe((res: any) => {
      this.custMemberList = res.recordset;
      console.log(this.custMemberList);
      for (let i = 0; i < this.custMemberList.length; i++) {
        if (this.custMemberList[i].MEMBTYPE === 'F') {
          this.custMemberList[i].MEMBTYPE = 'Family';
          this.memberListDataSource = new MatTableDataSource(this.custMemberList);
          this.memberListDataSource.sort = this.sort;
          this.memberListDataSource.paginator = this.paginator;
        }
        else if (this.custMemberList[i].MEMBTYPE === 'C') {
          this.custMemberList[i].MEMBTYPE = 'Corporate';
          this.memberListDataSource = new MatTableDataSource(this.custMemberList);
          this.memberListDataSource.sort = this.sort;
          this.memberListDataSource.paginator = this.paginator;
        }
        else if (this.custMemberList[i].MEMBTYPE === 'S') {
          this.custMemberList[i].MEMBTYPE = 'Single';
          this.memberListDataSource = new MatTableDataSource(this.custMemberList);
          this.memberListDataSource.sort = this.sort;
          this.memberListDataSource.paginator = this.paginator;
        }
      }
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
  
  getCustmerInvoices(pcode: string,sfyear: string,efyear: string) {
    console.log(sfyear);
    console.log(efyear);

    this.financeservice.getCustomerInvoices(pcode,sfyear,efyear).subscribe((res: any) => {
      this.custInvoiceList = res.recordset;
      console.log(this.custInvoiceList);
    }, (err: any) => {
      console.log(err);
    })
  }

  getAggrementDetails(pcode: string) {
    this.financeservice.getAggrementDetails(pcode).subscribe((res: any) => {
      this.custAgreementList = res.recordset;
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
  }

  ngOnInit(): void {
    this.getAccountsCategoryData();
    this.getAccountsTypeData();
    this.getCustomerExcel();
    this.getCustomerDetails(this.route.snapshot.params.id);
  }

  copyToContact() {
    const data = this.custForm.value;
    this.dataSharing.setData(data);
    var myurl = `/crm/contact/details/exp`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }
  
  flipChartGrid() {
    this.opbalChartBool = !this.opbalChartBool;
  }

  getCustomerDetails(value: any) {
    this.varpcode = value
    this.financeservice.getCustomerBypcode(this.varpcode).subscribe((res: any) => {
      this.selectCustomerDetail(res.recordset[0]);
    }, (err: any) => {
      console.log(err);
    })
  }

  selectCustomerDetail(data: any) {
    this.custForm.patchValue({
      pcode: data.PCODE,
      cname: data.CUST_NAME,
      cStatus: data.STATUS,
      cAccountCategory: data.ACCOUNT_CATEGORY_CD,
      cType: data.ACCOUNT_TYPE_CD,
      cCR: data.CR_CPR,
      cTaxNo: data.TAX_1_NO
    });
    this.varpcode = data.PCODE;
    this.getCustmerParty(this.varpcode);
    this.getCustmerInvoices(this.varpcode,this.sfyear,this.efyear);
    this.getCustomerMember(this.varpcode);
    this.getAggrementDetails(this.varpcode);
  }

  public gotoContactDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

  public gotoMembersDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

  public gotoInvoiceDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }
}