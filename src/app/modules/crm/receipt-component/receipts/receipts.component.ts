import { formatNumber } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, Inject, LOCALE_ID, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as converter from 'number-to-words';
import { CrmService } from 'src/app/services/crm/crm.service';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing.service';
import { FinanceService } from 'src/app/services/finance/finance.service';

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrls: ['./receipts.component.scss']
})
export class ReceiptsComponent implements OnInit {

  @ViewChild('partyLookupDialog', { static: false }) partyLookupDialog!: TemplateRef<any>;
  @ViewChild('receiptLookupDialog', { static: false }) receiptLookupDialog!: TemplateRef<any>;
  @ViewChild('HelpDialog', { static: false }) HelpDialog!: TemplateRef<any>;

  receiptForm: FormGroup;
  paymenttypeArr: any[] = [];
  bankdetailArr: any[] = [];
  partyArr: any[] = [];
  receiptArr: any[] = [];
  custRvcArr: any[] = [];
  unalcInvArr: any[] = [];
  parAlcInvArr: any[] = [];

  selectedRowIndex: any = 0;

  partyDisplayedColumns: string[] = [ 'cust_name', 'party_id', 'add1', 'add2', 'add3', 'phone1', 'mobile', 'email_id'];
  partyDataSource = new MatTableDataSource(this.partyArr);

  receiptDisplayedColumns: string[] = [ 'custcode', 'custname', 'recno', 'recdt', 'recdesc', 'amount', 'recamount', 'recbal'];
  receiptDataSource = new MatTableDataSource(this.receiptArr);

  docRvcNo: any;
  docRvc: any;

  mPartyName: string = "";
  mPartyId: string = "";
  mPartyPhone: string = "";
  mPartyAdd1: string = "";
  mPartyAdd2: string = "";
  mPartyAdd3: string = "";
  mPartyEmail: string = "";
  mPartyTelephone: string = "";

  mRvcNo: string = "";
  outputWords: string = "";

  mSelectedUnallInvoice: any[] = [];
  mSelectedPartInvoice: any[] = [];

  mReceiptAmount = 0;
  mAllocatedAmount = 0;
  mBalanceAmount = 0;

  showAllocation: Boolean = false;
  isUiaChecked: Boolean = false;

  utc = new Date();
  mCurDate = this.formatDate(this.utc);
  mCYear = new Date().getFullYear();

  constructor(private crmservice: CrmService,private dialog:MatDialog,public snackBar: MatSnackBar,private financeService: FinanceService,private route: ActivatedRoute, private router: Router, private dataSharing: DataSharingService, @Inject(LOCALE_ID) public locale: string) {
    this.receiptForm = new FormGroup({
      rvcNo: new FormControl('', []),
      rvcDate: new FormControl('', []),
      rvcPcode: new FormControl('', []),
      rvcPaymentType: new FormControl('', []),
      rvcRefNo: new FormControl('', []),
      rvcRefDate: new FormControl('', []),
      rvcBank: new FormControl('', []),
      rvcAmount: new FormControl('', []),
      rvcDesc: new FormControl('', []),
      rvcRemarks: new FormControl('', []),
      rvcBalance: new FormControl('', [])
    })
   }

  ngOnInit(): void {
    this.getpayType();
    this.getAllBankDetails();
    this.getDetails(this.route.snapshot.params.id);
  }

  getDetails(value: any) {
    if(value === 'new') {
      this.newForm();
    } else {
      this.searchReceipt(value);
    }
  }

  getpayType(){
    this.crmservice.getPaymentType().subscribe((res: any) => {
      this.paymenttypeArr = res.recordset;
    }, (err: any) => {
      console.log(err);
    })
  }

  getAllBankDetails(){
    this.crmservice.getAllBank().subscribe((res: any) => {
      this.bankdetailArr = res.recordset;
    }, (err: any) => {
      console.log(err);
    })
  }

  lookUpReceipt(rvcNo: string){
    this.selectedRowIndex = 0;
    this.financeService.searchReceipts(rvcNo).subscribe((res: any) => {
      this.receiptArr = res.recordset;
      this.receiptDataSource = new MatTableDataSource(this.receiptArr);
      let dialogRef = this.dialog.open(this.receiptLookupDialog);
    }, (err: any) => {
    })
  }
  
  searchReceipt(rvcNo: string){
    this.refreshForm();
    this.financeService.getReceipt(rvcNo).subscribe((res: any) => {
      this.selectReceipt(res.recordset[0]);
    }, (err: any) => {
    })
  }

  selectReceipt(rvcObj: any){
    console.log(rvcObj);
    const date = this.formatDate(rvcObj.REFDT);
    this.receiptForm.patchValue({
      rvcNo: rvcObj.REFNO,
      rvcDate: date,
      rvcPcode: rvcObj.CUST_CODE,
      rvcPaymentType: rvcObj.PAYMENTTYPE,
      rvcRefNo: rvcObj.REFNO,
      rvcRefDate: rvcObj.REFDT,
      rvcBank: rvcObj.BANK,
      rvcAmount:rvcObj.RECEIPT,
      rvcDesc: rvcObj.DESCRIPTION,
      //rvcRemarks: rvcObj.SUBJECT
    });
    this.mRvcNo = rvcObj.REFNO;
    this.crmservice.getPartyDetails(rvcObj.CUST_CODE).subscribe((res: any) => {
      this.selectPcode(res.recordset[0],'rvc');
    })
    
    let dialogRef = this.dialog.closeAll();
  }

  viewHelp() {
    let dialogRef = this.dialog.open(this.HelpDialog);
  }

  getInvoiceDetails(custcode: string){
    this.financeService.getUnallocatedInvoice(custcode).subscribe((res: any) => {
      console.log(this.unalcInvArr);
      this.unalcInvArr = res.recordset;
    }, (err: any) => {
      console.log(err)
    });
    this.financeService.getPartiallyAllocatedInvoice(custcode, this.mRvcNo).subscribe((res: any) => {
      console.log(this.parAlcInvArr);
      this.parAlcInvArr = res.recordset;
      this.calculateTotal();
    }, (err: any) => {
      console.log(err);
      this.calculateTotal();
    });
  }

  lookUpPcode(value: string){
    this.selectedRowIndex = 0;
    this.crmservice.getPartyFromName(value).subscribe((res: any) => {
      this.partyArr = res.recordset;
      this.partyDataSource = new MatTableDataSource(this.partyArr);
      let dialogRef = this.dialog.open(this.partyLookupDialog);
    }, (err: any) => {
    })
  }
  
  selectPcode(obj: any,condition: string){
    console.log(obj);
    if (condition === 'rvc') {
      this.receiptForm.patchValue({
        rvcPcode: obj.PCODE,
      });
      this.mPartyName = obj.NAME;
      this.mPartyId = obj.PCODE;
      this.mPartyAdd1 = obj.ADD1;
      this.mPartyAdd2 = obj.ADD2;
      this.mPartyAdd3 = obj.ADD3;
      this.mPartyPhone = obj.PHONE1;
      this.mPartyEmail = obj.EMAIL_ID;
      this.mPartyTelephone = obj.MOBILE;
    } else if (condition === 'lut') {
      this.receiptForm.patchValue({
        rvcPcode: obj.PCODE,
      });
      this.mPartyName = obj.NAME;
      this.mPartyId = obj.PCODE;
      this.mPartyAdd1 = obj.ADD1;
      this.mPartyAdd2 = obj.ADD2;
      this.mPartyAdd3 = obj.ADD3;
      this.mPartyPhone = obj.PHONE1;
      this.mPartyEmail = obj.EMAIL_ID;
      this.mPartyTelephone = obj.MOBILE;
    }
    let dialogRef = this.dialog.closeAll();
    this.getInvoiceDetails(obj.REFNO);
  }

  public savePDF(): void {  
    const data = this.receiptForm.value;
    var doc = new jsPDF("portrait", "px", "a4");
    var img = new Image()
    img.src = 'assets/Pics/download.png';
    doc.setFontSize(13)
    doc.setFont('Times New Roman','bold');
    doc.text('RECEIPT VOUCHER',300, 115);
    doc.setFont(undefined,'normal');
    doc.text('Receipt       :',300, 125);
    doc.text(this.mRvcNo,375, 125);
    doc.text('Date          :',300, 135);
    doc.text(data.rvcDate,375, 135);
    doc.text('Received (BHD):',300, 145);
    doc.text(String(formatNumber(data.rvcAmount, this.locale,'1.3-3')),375, 145);
    //doc.addImage(img, 'png', 15, 15, 60, 60);
    doc.line(20, 100, 425, 100); 
    doc.setDrawColor(0);
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(20, 110, 150, 55, 5, 5, 'FD');
    //doc.roundedRect(150, 90, 150, 70, 5, 5, 'FD');
    doc.setFontSize(11);
    doc.text('To,',30, 120);
    doc.text(this.mPartyName,30, 130);
    doc.text(this.mPartyAdd1,30, 140);
    doc.text(this.mPartyAdd2,30, 150);
    doc.text(this.mPartyPhone,30, 160);
    doc.text(`Received with thanks towards ${data.rvcRemarks}`,20, 175);
    this.outputWords = converter.toWords(data.rvcAmount);
    doc.setFont(undefined,'bold');
    doc.text(`BHD ${this.outputWords} only`,20, 185);
    doc.setFont(undefined,'normal');
    var detArr= [];
    for(let i=0; i<this.parAlcInvArr.length; i++) {
      var tempArr = [];
      tempArr.push(this.parAlcInvArr[i].INV_NO);
      tempArr.push(this.formatDate(this.parAlcInvArr[i].INV_DATE));
      tempArr.push(formatNumber(this.parAlcInvArr[i].AMOUNT, this.locale,'1.3-3'));
      tempArr.push(formatNumber(this.parAlcInvArr[i].REFAMOUNT, this.locale,'1.3-3'));
      tempArr.push(formatNumber(this.parAlcInvArr[i].AMOUNT-this.parAlcInvArr[i].REFAMOUNT, this.locale,'1.3-3'));
      console.log(tempArr);
      detArr.push(tempArr);
    }
    autoTable(doc, {
      startY: 200,                    
      theme: 'grid',
      headStyles: {
        fillColor: [32,42,68]
      },
      head: [['Invoice Number', 'Date', 'Amount (BHD)', 'Allocated (BHD)', 'Balance (BHD)']],
      body: detArr,
     // bodyStyles: {lineColor: [0, 0, 0]}
    });
    doc.setDrawColor(0, 0, 0);
    doc.line(20, 325, 425, 325); 
    const outtro = `Dear ${this.mPartyName}, \nWe hope you are satisfied by the services extended at the Resort. If you have any suggestions or require any assistance, \nplease feel free to contact the undersigned or the Membership office between 9AM-1PM & 2PM-5PM throughout the week.`;
    doc.text(outtro,20, 340);
    doc.text("Thanking you once again, and assuring of our best services all the times.",20, 390);
    //doc.text(`Received by ${data.rvcPaymentType}`,20, 410);
    doc.setFont(undefined,'bold');
    doc.text(`Al Bander Resort`,20, 450);
    doc.line(20, 460, 200, 460); 
    doc.setFont(undefined,'normal');
    doc.text("This is a computer generated receipt, no signature is required",20, 470);
    doc.output('datauri');
    doc.save(this.mRvcNo + '.pdf');  
    var string = doc.output('datauri');
    var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  } 

  onFormSubmit(){
    const data = this.receiptForm.value;
    console.log(data);
    this.financeService.getReceipt(data.rvcNo).subscribe((res: any) => {
      console.log(res);
    }, (err: any) => {
      this.financeService.postOutstanding(String(this.mCYear), data.rvcNo, data.rvcDate, data.rvcPcode, 'RVC', data.rvcNo, data.rvcDate, '0', data.rvcAmount, data.rvcDesc, data.rvcRemarks,data.rvcPaymentType, data.rvcBank).subscribe((res:any) => {
        console.log(res);
        this.financeService.updateNewDocRvNo(this.docRvcNo, String(this.mCYear)).subscribe((resp: any) => {
          console.log(resp);
          this.searchReceipt(this.docRvc);
        })
      })
    }) 
  }

  selectCol(row: any, param: string,checked:any){
    console.log(checked);
    if (checked === 'Y') {
      if (param === 'uia') {
        this.mSelectedUnallInvoice.push(row);
      } 
    } else if (checked === 'N'){ 
      if (param === 'uia') {
        this.mSelectedUnallInvoice.forEach((element,index)=>{
          if(element==row) this.mSelectedUnallInvoice.splice(index,1);
        });
      } 
    }
    console.log(this.mSelectedUnallInvoice);
    console.log(this.mSelectedPartInvoice);
    this.calculateTotal();
  }

  prepareReceipt(row: any) {
    this.parAlcInvArr = [];
    
    this.calculateTotal();
  }

  newForm() {
    this.partyArr = [];
    this.receiptArr = [];
    this.custRvcArr = [];
    this.unalcInvArr = [];
    this.parAlcInvArr = [];
    this.mPartyName = "";
    this.mPartyPhone = "";
    this.mPartyId = "";
    this.mPartyAdd1 = "";
    this.mPartyAdd2 = "";
    this.mPartyAdd3 = "";
    this.mPartyEmail = "";
    this.mPartyTelephone = "";
    this.mRvcNo = "";
    this.mSelectedUnallInvoice = [];
    this.mSelectedPartInvoice = [];
    this.mReceiptAmount = 0;
    this.mAllocatedAmount = 0;
    this.mBalanceAmount = 0;
    this.showAllocation = false;
    const year = String(this.mCYear);
    this.financeService.getDocForRvc(year).subscribe((res: any) => {
      const yearStr = String(res.recordset[0].CYEAR).substring(2);
      this.docRvcNo = res.recordset[0].FIELD_VALUE_NM + 1;
      this.docRvc = 'RVC' + yearStr + '-' + this.docRvcNo.toString();
      this.receiptForm = new FormGroup({
        rvcNo: new FormControl(this.docRvc, []),
        rvcDate: new FormControl(this.mCurDate, []),
        rvcPcode: new FormControl('', []),
        rvcPaymentType: new FormControl('', []),
        rvcRefNo: new FormControl(this.docRvc, []),
        rvcRefDate: new FormControl(this.mCurDate, []),
        rvcBank: new FormControl('', []),
        rvcAmount: new FormControl('', []),
        rvcDesc: new FormControl('', []),
        rvcRemarks: new FormControl('', []),
        rvcBalance: new FormControl('', [])
      });
    });
  }

  refreshForm() {
    this.partyArr = [];
    this.receiptArr = [];
    this.custRvcArr = [];
    this.unalcInvArr = [];
    this.parAlcInvArr = [];
    this.mPartyName = "";
    this.mPartyPhone = "";
    this.mPartyId = "";
    this.mPartyAdd1 = "";
    this.mPartyAdd2 = "";
    this.mPartyAdd3 = "";
    this.mPartyEmail = "";
    this.mPartyTelephone = "";
    this.mRvcNo = "";
    this.mSelectedUnallInvoice = [];
    this.mSelectedPartInvoice = [];
    this.mReceiptAmount = 0;
    this.mAllocatedAmount = 0;
    this.mBalanceAmount = 0;
    this.showAllocation = false;
    this.receiptForm = new FormGroup({
      rvcNo: new FormControl('', []),
      rvcDate: new FormControl('', []),
      rvcPcode: new FormControl('', []),
      rvcPaymentType: new FormControl('', []),
      rvcRefNo: new FormControl('', []),
      rvcRefDate: new FormControl('', []),
      rvcBank: new FormControl('', []),
      rvcAmount: new FormControl('', []),
      rvcDesc: new FormControl('', []),
      rvcRemarks: new FormControl('', []),
      rvcBalance: new FormControl('', [])
    });
  }

  arrowUpEvent(type: string, index: number){
    this.highlight(type, --index);
  }

  arrowDownEvent(type: string, index: number){
    this.highlight(type, ++index);
  }

  highlight(type: string, index: number){
    if(type === "party"){
      if(index >= 0 && index <= this.partyArr.length - 1){
        this.selectedRowIndex = index;
      }
    } else if(type === "receipt"){
      if(index >= 0 && index <= this.receiptArr.length - 1){
        this.selectedRowIndex = index;
      }
    } 
  }

  calculateTotal(){
    const data = this.receiptForm.value;
    this.parAlcInvArr.forEach((element,index)=>{
      this.mAllocatedAmount += element.REFAMOUNT;
    });
    this.receiptForm.patchValue({
      rvcBalance: Number(data.rvcAmount) - this.mAllocatedAmount
    })
  }

  formatDate(date: any) {
    var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    } 
    if (month.length < 2) {
      month = '0' + month;
    }
    return [day, month, year].join('-');
  }

  deallocate(row: any) {
    const rvcData = this.receiptForm.value;
    this.financeService.getAllocatedReceipt(row.INV_NO, rvcData.rvcNo).subscribe((res: any) => {
      console.log(res);
      if(res.recordset[0].INV_AMOUNT  === 0) {
        this.financeService.postOutstanding(String(this.mCYear), rvcData.rvcNo, rvcData.rvcDate, rvcData.rvcPcode, 'RVC', rvcData.rvcNo, rvcData.rvcDate, '0', rvcData.rvcAmount, rvcData.rvcDesc, rvcData.rvcRemarks, rvcData.rvcPaymentType, rvcData.rvcBank).subscribe((res:any) => {
          console.log(res);
          this.financeService.deleteAllocatedReceipt(row.INV_NO, rvcData.rvcNo).subscribe((res: any) => {
            console.log(res);
            this.getDetails(this.route.snapshot.params.id);
          })
        }, (err: any) => {
          console.log(err);
        })
      } else {
        this.financeService.postOutstanding(String(this.mCYear), rvcData.rvcNo, rvcData.rvcDate, rvcData.rvcPcode, 'RVC', rvcData.rvcNo, rvcData.rvcDate, '0', rvcData.rvcAmount, rvcData.rvcDesc, rvcData.rvcRemarks, rvcData.rvcPaymentType, rvcData.rvcBank).subscribe((res:any) => {
          console.log(res);
          this.financeService.resetAllocationReceipt(row.INV_NO, 'null', rvcData.rvcNo, rvcData.rvcDate, '0', rvcData.rvcDesc, rvcData.rvcRemarks, rvcData.rvcPaymentType, rvcData.rvcBank).subscribe((res: any) => {
            console.log(res);
            this.getDetails(this.route.snapshot.params.id);
          })
        }, (err: any) => {
          console.log(err);
        })
      }
    })
  }

  public viewAllocation(row: any) {
    const rvcData = this.receiptForm.value;
    const allocationData = {
      invNo: row.INV_NO,
      invDate: this.formatDate(row.INV_DATE),
      invAmount: row.AMOUNT,
      invBalance: row.BALANCE,
      pcode: rvcData.rvcPcode,
      rvcNo: rvcData.rvcNo,
      rvcDate: rvcData.rvcDate,
      rvcAmount: rvcData.rvcBalance,
      rvcDesc: rvcData.rvcDesc,
      rvcRemarks: rvcData.rvcRemarks,
      rvcPaymentType: rvcData.rvcPaymentType,
      rvcBank: rvcData.rvcBank,
      rvcPrevAmt: row.REFAMOUNT,
      mPartyName: this.mPartyName,
      mPartyId: this.mPartyId,
      mPartyPhone: this.mPartyPhone,
      mPartyAdd1: this.mPartyAdd1,
      mPartyAdd2: this.mPartyAdd2,
      mPartyAdd3: this.mPartyAdd3,
      mPartyEmail: this.mPartyEmail,
      mPartyTelephone: this.mPartyTelephone,
    }
    this.dataSharing.setData(allocationData);
    var id = rvcData.rvcNo;
    var myurl = `/crm/receipt/details/${id}/allocation`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }
} 
