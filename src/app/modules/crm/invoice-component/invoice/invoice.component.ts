import { Component, ElementRef, OnInit, TemplateRef, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CrmService } from 'src/app/services/crm/crm.service';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing.service';
import { LookupService } from 'src/app/services/lookup/lookup.service';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { FinanceService } from 'src/app/services/finance/finance.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from "xlsx";
import * as converter from 'number-to-words';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import { formatCurrency, formatNumber } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ComponentsModule } from 'src/app/archive/components/components.module';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss'],
})

export class InvoiceComponent implements OnInit {
  searchValue: any;
  isTableExpanded = false;
  invoiceForm: FormGroup;
  
  agrDetArr: any[] = [];
  invArr: any[] = [];

  selectedRowIndex: any = 0;

  docInvNo: any;
  docInv: any;

  mPartyName: string = "";
  mPartyId: string = "";
  mPartyPhone: string = "";
  mPartyAdd1: string = "";
  mPartyAdd2: string = "";
  mPartyAdd3: string = "";
  mInvNo: string = "";
  mAgrNo: string = "";
  mInvDate: string = "";
  mAgrStartDate: string = "";
  mAgrEndDate: string = "";
  mInvTotal = 0;
  mInvNetTotal = 0;
  mInvVAT = 0;
  mInvDisc = 0;
  mInvGTotal = 0;
  mInvNumToWords = '';

  mExcelData: any;

  utc = new Date();
  mCurDate = this.formatDate(this.utc);
  mCYear = new Date().getFullYear();

  invReportApiUrl: string = "";
  invReportName: string = "";

  @ViewChild('InvoiceLookUpDialouge', { static: false }) InvoiceLookUpDialouge!: TemplateRef<any>;
  @ViewChild('HelpDialog', { static: false }) HelpDialog!: TemplateRef<any>;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;
  @ViewChild('content', { static: false }) content: ElementRef; 
 

  InvoiceDisplayedColumns: string[] = ['invno', 'sono', 'date', 'custname','total'];
  InvoiceDataSource = new MatTableDataSource(this.invArr);

  BlaDisplayedColumns: string[] = [ "slno", "desc", "code", "name", "amount"];
  BlaListDataSource = new MatTableDataSource(this.agrDetArr);

  constructor(private crmservice: CrmService,private dialog: MatDialog,private financeService: FinanceService,private lookupservice:LookupService,private dataSharing: DataSharingService, private route: ActivatedRoute, private router: Router, private httpClient: HttpClient,@Inject(LOCALE_ID) public locale: string,private snackBar: MatSnackBar) {
    this.invoiceForm = new FormGroup({
      invNo: new FormControl('', [ Validators.required]),
      agrNo: new FormControl('', [ Validators.required]),
      invDate: new FormControl('', [ Validators.required]),
      subject: new FormControl('', [ Validators.required]),
      total: new FormControl('', [ Validators.required]),
      gtotal: new FormControl('', [ Validators.required]),
      discount: new FormControl('', [ Validators.required]),
      vat: new FormControl('', [ Validators.required]),
      custname: new FormControl('', [ Validators.required]),
      pCode: new FormControl('', [ Validators.required]),
      add1: new FormControl('', [ Validators.required]),
      add2: new FormControl('', [ Validators.required]),
      add3: new FormControl('', [ Validators.required]),
      phoneNo: new FormControl('', [ Validators.required]),
      remarks: new FormControl('', [ Validators.required]),
    });
  } 

  refreshForm() {
    this.invArr = [];
    this.mInvTotal = 0;
    this.mInvNetTotal = 0;
    this.mInvVAT = 0;
    this.mInvDisc = 0;
    this.mInvGTotal = 0;
    this.mInvNo = "";
    this.mInvDate = "";
    this.mAgrNo = "";
    this.mPartyName = "";
    this.mPartyPhone = "";
    this.mPartyId = "";
    this.mPartyAdd1 = "";
    this.mPartyAdd2 = "";
    this.mPartyAdd3 = "";
    this.invoiceForm = new FormGroup({
      invNo: new FormControl('', [ Validators.required]),
      soNo: new FormControl('', [ Validators.required]),
      agrNo: new FormControl('', [ Validators.required]),
      invDate: new FormControl('', [ Validators.required]),
      total: new FormControl('', [ Validators.required]),
      gtotal: new FormControl('', [ Validators.required]),
      vat: new FormControl('', [ Validators.required]),
      custname: new FormControl('', [ Validators.required]),
      discount: new FormControl('', [ Validators.required]),
      pCode: new FormControl('', [ Validators.required]),
      add1: new FormControl('', [ Validators.required]),
      add2: new FormControl('', [ Validators.required]),
      add3: new FormControl('', [ Validators.required]),
      phoneNo: new FormControl('', [ Validators.required]),
      remarks: new FormControl('', [ Validators.required]),
      subject: new FormControl('', [ Validators.required]),
    });
  }

  getInvoice(invno: any) {
    this.financeService.getSales(invno).subscribe((res: any) => {
      console.log(res.recordset[0])
      this.selectInvoice(res.recordset[0]);
    }, (err: any) => {
      
  })
  }

  lookupInvoice(value: string) {
    this.selectedRowIndex = 0;
    let dialogRef = this.dialog.open(this.InvoiceLookUpDialouge);    
    this.financeService.searchSales(value).subscribe((res: any) => {
      console.log(this.invArr)
      this.invArr = res.recordset;
      this.InvoiceDataSource = new MatTableDataSource(this.invArr);
    }, (err: any) => {
    })
  }

  selectInvoice(invoice: any) {
    let dialogRef = this.dialog.closeAll();
    const date = this.formatDate(invoice.TRN_DATE);
    this.crmservice.getagreementmaster(invoice.REF_NO).subscribe((res: any) => {
      console.log(res.recordset[0]);
      this.mInvNo = invoice.TRN_NO;
      this.mInvDate = date;
      this.mAgrStartDate = this.formatDate(res.recordset[0].START_DATE);
      this.mAgrEndDate =  this.formatDate(res.recordset[0].END_DATE);
      this.mAgrNo = res.recordset[0].AGR_NO;
      this.mPartyName = invoice.CUST_NAME;
      this.mPartyId = res.recordset[0].PARTY_ID;
      this.mPartyPhone = res.recordset[0].CUST_PHONE1;
      this.mPartyAdd1 = res.recordset[0].CUST_ADD1;
      this.mPartyAdd2 = res.recordset[0].CUST_ADD2;
      this.mPartyAdd3 = res.recordset[0].CUST_ADD3;
      this.mInvTotal = invoice.AMOUNT;
      this.mInvNetTotal = invoice.AMOUNT - invoice.DISCOUNT;
      this.mInvVAT = invoice.TAX_1_AMT;
      this.mInvDisc = invoice.DISCOUNT;
      this.mInvGTotal = invoice.GROSSAMOUNT;
      this.mInvNumToWords = converter.toWords(invoice.GROSSAMOUNT);
      this.invoiceForm.patchValue({
        invNo: invoice.TRN_NO,
        soNo: invoice.REF_NO,
        agrNo: invoice.REF_NO,
        invDate: date,
        total: invoice.AMOUNT,
        gtotal: invoice.GROSSAMOUNT,
        discount: invoice.DISCOUNT,
        vat: invoice.TAX_1_AMT,
        custname: invoice.CUST_NAME,
        pCode: res.recordset[0].PCODE,
        add1: res.recordset[0].CUST_ADD1,
        add2: res.recordset[0].CUST_ADD2,
        add3: res.recordset[0].CUST_ADD3,
        phoneNo: res.recordset[0].CUST_PHONE1,
        remarks: invoice.REMARKS,
        subject: invoice.SUBJECT
      })
      this.crmservice.getagreementDetails(this.mAgrNo).subscribe((res: any) => {
        this.agrDetArr = res.recordset;
        console.log(this.agrDetArr)
        for(let i=0; i<res.recordset.length; i++) {
          this.agrDetArr[i].FROMDT = this.formatDate(this.agrDetArr[i].FROMDT);
          this.agrDetArr[i].TODT = this.formatDate(this.agrDetArr[i].TODT);          
          this.crmservice.getAgreementBLA(this.mAgrNo, res.recordset[i].MEMBERCODE).subscribe((resp: any) => {
            const blA = resp.recordset;
            let blaList: string = "";
            for(let j=0; j<blA.length; j++) {
              if(blaList === ""){
                blaList = blA[j].ServiceName;
              } else {
                blaList = blaList + ', ' + blA[j].ServiceName;
              }
            }
            this.agrDetArr[i].blAArr = blA;
            this.agrDetArr[i].blAListArr = blaList;

          })
        }
        this.BlaListDataSource = new MatTableDataSource(this.agrDetArr);
        this.BlaListDataSource.sort = this.sort;
        this.BlaListDataSource.paginator = this.paginator;
        console.log(this.agrDetArr);
        this.toggleTableRows();
      })
    }, (err: any) => {
      
    })
  }
  
  ngOnInit(): void {
    this.getInvoice(this.route.snapshot.params.id);
  }

  onFormSubmit() {
    const invData = this.invoiceForm.value;
    const year = String(this.mCYear);
    console.log(invData);
    this.financeService.getSales(invData.invNo).subscribe((res: any) => {
      this.financeService.updateSales(year,invData.invNbr,invData.sodate,invData.pCode,invData.pCode, invData.custname, String(this.mInvGTotal), String(this.mInvDisc), String(this.mInvVAT), String(this.mInvTotal), invData.agrNo, invData.subject, invData.remarks, 'DBA', this.mCurDate).subscribe((resp: any) => {
        console.log(resp);
        this.financeService.updateOutstanding(year, invData.invNbr, invData.sodate, invData.pCode,'INV', 'null', invData.sodate, String(this.mInvGTotal), 'null', invData.subject, invData.remarks,'null','null').subscribe((respo: any) => {
          console.log(respo)
          this.snackBar.open(`Invoice ${invData.invNbr} successfully updated!`, "OK");
        })
      })
    }, (err: any) => {
      this.financeService.getDocForInv(year).subscribe((resp: any) => {
        const yearStr = String(resp.recordset[0].CYEAR).substring(2);
        this.docInvNo = resp.recordset[0].FIELD_VALUE_NM + 1;
        this.docInv = 'INV' + yearStr + '-' + this.docInvNo.toString();
        this.financeService.postSales(year,this.docInv,this.mCurDate,invData.pCode,invData.pCode, invData.custname, String(this.mInvGTotal), String(this.mInvDisc), String(this.mInvVAT), String(this.mInvTotal), invData.agrNo, invData.subject, invData.remarks, 'DBA', this.mCurDate).subscribe((resp: any) => {
          this.financeService.postOutstanding(year, this.docInv, this.mCurDate, invData.pCode, 'INV', 'null', this.mCurDate, String(this.mInvGTotal),'null', invData.subject, invData.remarks,'null','null').subscribe((respo: any) => {
            console.log(respo);
            this.refreshForm();
            this.financeService.updateDocForInv(this.docInvNo, String(this.mCYear)).subscribe((res: any) => {
              this.financeService.setInvoice(invData.agrNo, invData.soNo, this.docInv).subscribe((respos: any) => {
                this.getInvoice(invData.docInv);
                this.snackBar.open(`Invoice ${this.docInv} successfully inserted!`, "OK");
              })
            }, (err: any) => {
              console.log(err);
            });
          })
        });
      }, (error: any) => {
        console.log(error);
      })
    });
  }
  
  arrowDownEvent(type: string, index: number){
    this.highlight(type, ++index);
  }

  arrowUpEvent(type: string, index: number){
    this.highlight(type, --index);
  }
  
  setReportData(apiUrl: string, reportType: string){
    const reportData = {
      apiUrl: apiUrl,
      reportType: reportType
    };
    this.dataSharing.setData(reportData);
  }
  
  highlight(type: string, index: number){
    if (type === "invoice") {
      if(index >= 0 && index <= this.invArr.length - 1){
        this.selectedRowIndex = index;
      } 
    }
  }

  viewHelp() {
    let dialogRef = this.dialog.open(this.HelpDialog);
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

  public goToAgreement() {
    const soData = this.invoiceForm.value;
    var id = soData.agrNo;
    var myurl = `/crm/agreements/details/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;
    this.BlaListDataSource.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }

  excelFunc() {
    this.httpClient.get('assets/resources/albanderInvoice.xlsx',{responseType:'blob'}).subscribe((data: any) => {
      const soData = this.invoiceForm.value;
      let file = data;
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(file);

      fileReader.onload = (e) => {
        var workBook = XLSX.read(fileReader.result, {type: 'binary'});
        var SheetNames = workBook.SheetNames;
        this.mExcelData = XLSX.utils.sheet_to_json(workBook.Sheets[SheetNames[1]]);
        console.log(this.mExcelData);

        this.crmservice.getPartyFromName(this.mPartyName).subscribe((res: any) => {
          const headerData = {
            "Pcode": res.recordset[0].pcode,
            "Title": res.recordset[0].title_cd,
            "Name": res.recordset[0].cust_name,
            "Add1": res.recordset[0].add1,
            "Add2": res.recordset[0].add2,
            "Pobox": res.recordset[0].pobox,
            "Country": res.recordset[0].add3,
            "Phone": res.recordset[0].phone1,
            "Email": res.recordset[0].email_id,
            "PartyTitle": res.recordset[0].title_cd,
            "PartyName": res.recordset[0].name,
            "Invoice": soData.invNo,
            "InvDate": soData.invDate,
            "Agreement": soData.agrNo
          }
          const headerlist: any[] = [];
          headerlist.push(headerData);

          const ws1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.agrDetArr);
          const ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(headerlist);
          //XLSX.utils.book_append_sheet(workBook, ws, 'test');

          workBook.Sheets["data"] = ws1;
          workBook.Sheets["customer"] = ws2;
          XLSX.writeFile(workBook, "Invoice.xlsx");
        })
      }
    }) 
  }

  public SavePDF(): void {  
    var doc = new jsPDF("portrait", "px", "a4");
    doc.setFontSize(13)
    doc.setFont('Times New Roman','bold');
    doc.text('MEMBERSHIP ADVICE',300, 100);
    doc.setFont(undefined,'normal');
    doc.text('Invoice',300, 110);
    doc.text(`: ${this.mInvNo}`,360, 110);
    doc.text('Date',300, 120);
    doc.text(`: ${this.mInvDate}`,360, 120);
    doc.text('Agreement',300, 130);
    doc.text(`: ${this.mAgrNo}`,360, 130);
    doc.setFontSize(11);
    doc.text(this.mPartyName,20, 100);
    doc.text(this.mPartyAdd1,20, 110);
    doc.text(this.mPartyAdd2,20, 120);
    doc.text(this.mPartyAdd3,20, 130);
    doc.text(this.mPartyPhone,20, 140);
    const intro = `Dear ${this.mPartyName},\n\nWe take this opportunity to thank you for being one of the loyal Members of Al Bander Hotel & Resort, and look forward \nto the same in the future. As your membership is due for renewal, please find below the payment details payable for the \nforthcoming year and would appreciate if you could kindly settle the same at the earliest.`;
    doc.text(intro,20, 155);
    var detArr= [];
    for(let i=0; i<this.agrDetArr.length; i++) {
      var tempArr = [];
      tempArr.push(this.agrDetArr[i].blAArr);
      detArr.push(tempArr);
    }
    var arr = detArr[0]
    autoTable(doc, {
      html: '#invTable',
      startY: 200,    
      theme: 'plain',
      bodyStyles: {
        minCellHeight: 15 +(10*arr[0].length)
      },
      tableLineColor: [105, 105, 105],
      tableLineWidth: 0.15,
      rowPageBreak: 'avoid',
      showFoot: 'lastPage',
      margin: {
        left: 20,
        right: 20,
      },
      willDrawCell: function(data) {
        doc.setDrawColor(105, 105, 105); // set the border color
        doc.setLineWidth(0.15); // set the border with
        // draw bottom border
        doc.line(data.cell.x,data.cell.y + data.cell.height,data.cell.x + data.cell.width,data.cell.y + data.cell.height);
        // draw top border
        doc.line(data.cell.x + data.cell.width,data.cell.y,data.cell.x,data.cell.y);
        // draw left border
        // doc.line(data.cell.x,data.cell.y + data.cell.height,data.cell.x,data.cell.y);
        // draw right border
        // doc.line(data.cell.x + data.cell.width,data.cell.y,data.cell.x + data.cell.width,data.cell.y + data.cell.height);
      },
      didDrawCell: function(data) {
        if (data.column.index === 4 && data.cell.section === 'body') {
          console.log(detArr)
          var srvArr = detArr[data.row.index];
          console.log(srvArr)

          var newArr = []
          for(let k=0; k<srvArr[0].length; k++) {
            var tempArr = [];
            tempArr.push(srvArr[0][k].ServiceName);
            tempArr.push(srvArr[0][k].MEMBERPRICE);
            console.log(tempArr);
            newArr.push(tempArr);
          }
          console.log(newArr);
          autoTable(doc, {
            head: [["Name", "Price (BHD)"]],
            body: newArr,
            startY: data.cell.y + 2,
            margin: {left: data.cell.x},
            tableWidth: 'wrap',
            theme: 'plain',
            styles: {
                fontSize: 8,
                cellPadding: 1,
            },
            willDrawCell: function(data) {
              doc.setDrawColor(105, 105, 105); // set the border color
              doc.setLineWidth(0.15); // set the border with
              // draw bottom border
              doc.line(data.cell.x,data.cell.y + data.cell.height,data.cell.x + data.cell.width,data.cell.y + data.cell.height);
              // draw top border
              doc.line(data.cell.x + data.cell.width,data.cell.y,data.cell.x,data.cell.y);
              // draw left border
              doc.line(data.cell.x,data.cell.y + data.cell.height,data.cell.x,data.cell.y);
              // draw right border
              doc.line(data.cell.x + data.cell.width,data.cell.y,data.cell.x + data.cell.width,data.cell.y + data.cell.height);
            },
        });
        }
      },
      columnStyles: {
        4: {halign: 'right', cellWidth: 100},
      }
    });
    doc.setFont(undefined,'normal');
    doc.text("At the same time we would like to also reiterate the following:\n      • In adherence with Al Bander policy, our customers are reminded that it is mandatory to obtain a membership club \n         at their preferred membership category (Single or Family) so as to achieve boat parking/access.\n      • Members who wish to renew their membership are required to pay the above mentioned amount within seven days\n         after the expiry date of their membership. Failing to do so will result in cancellation of their membership. \n         In the event of late renewal, re-joining fees will be applicable.\n      • In the event payment is made through bank transfer, the applicable bank charges will be borne by the Member.\n      • Should the Member wish to make any changes in the membership status or cancel their parking, kindly notify\n         the Membership Office prior to the expiration of the membership.\n      • Membership Promotions, if any, are subject to the respective Terms & Conditions as published.",20, 400);
    const outtro = `${this.mPartyName}, We hope you are satisfied by the services extended at the Resort. \nIf you have any suggestions or require any assistance, please feel free to contact the undersigned or the Membership office \nbetween 9AM-5PM throughout the week.`;
    doc.text(outtro,20, 500);
    doc.text("Thanking you once again, and assuring of our best services all the times.",20, 535);
    doc.text("Yours Sincerely,\n\n\n\nAHMED MOKHTAR\nGENERAL MANAGER",20, 555);
    doc.output('datauri');
    doc.save(this.mInvNo + '.pdf');  
    var string = doc.output('datauri');
    var iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>"
    var x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();
  } 
}