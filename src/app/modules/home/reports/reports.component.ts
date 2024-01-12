import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CrmService } from 'src/app/services/crm/crm.service';
import { FinanceService } from 'src/app/services/finance/finance.service';
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  mType = this.route.snapshot.params.type
  mReportType: string = ""; 
  showBilling = false;
  showBillList = false;
  showSales = false;
  showSaleList = false;
  showAgrList = false;
  showMembList = false;

  public billingSearchForm: FormGroup;
  public salesSearchForm: FormGroup;

  monthData: any[] = []
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  invChartData: any[] = [];
  rvcChartData: any[] = [];
  yearChartLabels: any[] = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  @ViewChild('invTable', {static: false}) invTable: ElementRef;
  @ViewChild('rvcTable', {static: false}) rvcTable: ElementRef;
  @ViewChild('agrTable', {static: false}) agrTable: ElementRef;

  billList: any[] = [];
  saleList: any[] = [];
  agreList: any[] = [];
  membList: any[] = [];
  membBreakList: any[] = [];

  chartOptions = {
    responsive: true
  };

  utc = new Date();

  mCMonth = new Date().getMonth();
  mCurYear = new Date().getFullYear();

  firstName: string = JSON.parse(localStorage.getItem('firstname'));
  lastName: string = JSON.parse(localStorage.getItem('lastname'));

  constructor(private route: ActivatedRoute, private reportsService: ReportsService, private financeService: FinanceService, private crmService: CrmService, private router: Router) { 
    if(this.mType === 'billing') {
      this.mReportType = "Billing";
      this.showBilling = true
    } else if (this.mType === 'sales') {
      this.mReportType = "Sales";
      this.showSales = true
    } else if (this.mType === 'agreements') {
      this.mReportType = "Near Expiry Agreements";
      this.showAgrList = true;
    } else if (this.mType === 'members') {
      this.mReportType = "Membership Breakdown";
      this.showMembList = true;
    }
    this.billingSearchForm = new FormGroup({
      billStartDate: new FormControl('', [ Validators.required]),
      billEndDate: new FormControl('', [ Validators.required]),
    });
    this.salesSearchForm = new FormGroup({
      saleStartDate: new FormControl('', [ Validators.required]),
      saleEndDate: new FormControl('', [ Validators.required]),
    });
  }

  ngOnInit() {
    this.getData();
    this.getInvData();
    this.getRvcData();
  }

  getData() {
    if(this.mType === 'billing') {
      var monthName = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
      var d = new Date();
      d.setDate(1);
      for (let i=0; i<=11; i++) {
        console.log(monthName[d.getMonth()] + ' ' + d.getFullYear().toString().slice(2));
        console.log(d.getMonth() + ' ' + d.getFullYear().toString());
        var monthNbr = d.getMonth() + 1
        console.log(monthNbr)
        this.reportsService.getMonthlyInvoices(monthNbr.toString(),d.getFullYear().toString()).subscribe((res: any) => {
          if (res.recordset.length === 0){
            var newMonth = {
              INDEX: i+1,
              MONTH: monthName[d.getMonth()] + ' ' + d.getFullYear().toString(),
              ARR: [],
              SUM: 0
            }
            console.log(newMonth)
            this.monthData.push(newMonth)
            d.setMonth(d.getMonth() - 1);
            console.log(d.getMonth() + ' ' + d.getFullYear().toString());
          } else {
            var totSum = 0
            for(let j=0; j<res.recordset.length; j++) {
              totSum += res.recordset[j].INV_AMOUNT
            }
            var newMonthD = {
              INDEX: i+1,
              MONTH: monthName[d.getMonth()] + ' ' + d.getFullYear().toString(),
              ARR: res.recordset,
              SUM: totSum
            }
            console.log(newMonthD)
            this.monthData.push(newMonthD)
            d.setMonth(d.getMonth() - 1);
            console.log(d.getMonth() + ' ' + d.getFullYear().toString());
          }
        }, (err: any) => {
          var newMonth = {
            INDEX: i+1,
            MONTH: monthName[d.getMonth()] + ' ' + d.getFullYear().toString(),
            ARR: [],
            SUM: 0
          }
          console.log(newMonth)
          this.monthData.push(newMonth)
          d.setMonth(d.getMonth() - 1);
          console.log(d.getMonth() + ' ' + d.getFullYear().toString());
        })
      }
    } else if (this.mType === 'sales') {
      var monthName = new Array("JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC");
      var d = new Date();
      d.setDate(1);
      for (let i=0; i<=11; i++) {
        console.log(monthName[d.getMonth()] + ' ' + d.getFullYear().toString().slice(2));
        console.log(d.getMonth() + ' ' + d.getFullYear().toString());
        var monthNbr = d.getMonth() + 1
        console.log(monthNbr)
        this.reportsService.getMonthlyReceipts(monthNbr.toString(),d.getFullYear().toString()).subscribe((res: any) => {
          if (res.recordset.length === 0){
            var newMonth = {
              INDEX: i+1,
              MONTH: monthName[d.getMonth()] + ' ' + d.getFullYear().toString(),
              ARR: [],
              SUM: 0
            }
            console.log(newMonth)
            this.monthData.push(newMonth)
            d.setMonth(d.getMonth() - 1);
            console.log(d.getMonth() + ' ' + d.getFullYear().toString());
          } else {
            var totSum = 0
            for(let j=0; j<res.recordset.length; j++) {
              totSum += res.recordset[j].REFAMOUNT
            }
            var newMonthD = {
              INDEX: i+1,
              MONTH: monthName[d.getMonth()] + ' ' + d.getFullYear().toString(),
              ARR: res.recordset,
              SUM: totSum
            }
            console.log(newMonthD)
            this.monthData.push(newMonthD)
            d.setMonth(d.getMonth() - 1);
            console.log(d.getMonth() + ' ' + d.getFullYear().toString());
          }
        }, (err: any) => {
          var newMonth = {
            INDEX: i+1,
            MONTH: monthName[d.getMonth()] + ' ' + d.getFullYear().toString(),
            ARR: [],
            SUM: 0
          }
          console.log(newMonth)
          this.monthData.push(newMonth)
          d.setMonth(d.getMonth() - 1);
          console.log(d.getMonth() + ' ' + d.getFullYear().toString());
        })
      }   
    } else if (this.mType === 'agreements') {
      this.reportsService.getMonthlyExpiringAgreements(String(this.mCMonth + 1)).subscribe((res: any) => {
        console.log(res.recordset)
        this.agreList = res.recordset
      })
    } else if (this.mType === 'members') {
      this.reportsService.getMembersBreakdown().subscribe((res: any) => {
        console.log(res.recordset)
        this.membList = res.recordset
        for (let i = 0; i < this.membList.length; i++) {
          if (this.membList[i].MEMBTYPE === 'F') {
            this.membList[i].MEMBTYPE = 'Family';
          }
          else if (this.membList[i].MEMBTYPE === 'C') {
            this.membList[i].MEMBTYPE = 'Corporate';
          }
          else if (this.membList[i].MEMBTYPE === 'S') {
            this.membList[i].MEMBTYPE = 'Single';
          }
        }
      })
      this.reportsService.getMembersBreakdownList().subscribe((res: any) => {
        console.log(res.recordset)
        this.membBreakList = res.recordset
        for (let i = 0; i < this.membBreakList.length; i++) {
          if (this.membBreakList[i].MEMBTYPE === 'F') {
            this.membBreakList[i].MEMBTYPE = 'Family';
          }
          else if (this.membBreakList[i].MEMBTYPE === 'C') {
            this.membBreakList[i].MEMBTYPE = 'Corporate';
          }
          else if (this.membBreakList[i].MEMBTYPE === 'S') {
            this.membBreakList[i].MEMBTYPE = 'Single';
          }
        }
        for (let i = 0; i < this.membBreakList.length; i++) {
          if (this.membBreakList[i].AGREEMENT_STATUS === 'RENEWEDAGREEMENT') {
            this.membBreakList[i].AGREEMENT_STATUS = 'Renewed';
          }
          else if (this.membBreakList[i].AGREEMENT_STATUS === 'NEWAGREEMENT') {
            this.membBreakList[i].AGREEMENT_STATUS = 'New';
          }
          else if (this.membBreakList[i].AGREEMENT_STATUS === 'NOT_RENEWED') {
            this.membBreakList[i].AGREEMENT_STATUS = 'Not Renewed';
          }
        }
      })
    }
    console.log(this.monthData)
  }

  getInvData() {
    this.reportsService.getyearlyInvoices().subscribe((res: any) => {
      var dataArr = [
        res.recordset[0].JAN, 
        res.recordset[0].FEB, 
        res.recordset[0].MAR, 
        res.recordset[0].APR, 
        res.recordset[0].MAY, 
        res.recordset[0].JUN, 
        res.recordset[0].JUL,
        res.recordset[0].AUG,
        res.recordset[0].SEP,
        res.recordset[0].OCT,
        res.recordset[0].NOV,
        res.recordset[0].DEC
      ];
      this.invChartData = [
        {
          data: dataArr,
          label: 'Invoice Amount'
        }
      ]
    }, (err: any) => {
      console.log(err);
    })
  }
  
  getRvcData() {
    this.reportsService.getyearlyReceipts().subscribe((res: any) => {
      var dataArr = [
        res.recordset[0].JAN, 
        res.recordset[0].FEB, 
        res.recordset[0].MAR, 
        res.recordset[0].APR, 
        res.recordset[0].MAY, 
        res.recordset[0].JUN, 
        res.recordset[0].JUL,
        res.recordset[0].AUG,
        res.recordset[0].SEP,
        res.recordset[0].OCT,
        res.recordset[0].NOV,
        res.recordset[0].DEC
      ];
      this.rvcChartData = [
        {
          data: dataArr,
          label: 'Recieved Amount'
        }
      ]
    }, (err: any) => {
      console.log(err);
    })
  }

  searchBillingData() {
    this.showBillList = false;
    const data = this.billingSearchForm.value;
    this.reportsService.getDailyInvoices(this.formatDate(data.billStartDate), this.formatDate(data.billEndDate)).subscribe((res: any)=> {
      console.log(res)
      this.billList = res.recordset
      this.showBillList = true;
    }, (err: any) =>{
      console.log(err)
    })
  }  
  
  printBillingData() {
    const data = this.billingSearchForm.value;
    console.log(this.formatDate(data.billStartDate));
    console.log(this.formatDate(data.billEndDate));
    
    var doc = new jsPDF("portrait", "px", "a4");
    doc.setFontSize(16)
    doc.setFont('Helvetica','bold');
    doc.text(`Billing Report`,10,80);
    doc.setFontSize(12);
    doc.line(5, 85, 440, 85); 
    doc.setFont('Helvetica','normal');
    doc.text(`Start date: ${this.formatDate(data.billStartDate)}`,10,95);
    doc.text(`End date: ${this.formatDate(data.billEndDate)}`,250,95);
    autoTable(doc, { 
      html: '#invTable',
      startY: 105,                    
      theme: 'plain',
      tableLineColor: [105, 105, 105],
      tableLineWidth: 0.15,
      rowPageBreak: 'avoid',
      showFoot: 'lastPage',
      margin: {
        left: 5,
        right: 7,
        bottom: 26,
        top: 80
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
    })
    doc = this.addWaterMark(doc);
    doc.save(`billing-report-${this.formatDate(data.billStartDate)}-${this.formatDate(data.billEndDate)}.pdf`);
  }  
  
  searchSalesData() {
    this.showSaleList = false;
    const data = this.salesSearchForm.value;
    this.reportsService.getDailyReceipts(this.formatDate(data.saleStartDate), this.formatDate(data.saleEndDate)).subscribe((res: any)=> {
      console.log(res)
      this.saleList = res.recordset
      this.showSaleList = true;
    }, (err: any) =>{
      console.log(err)
    })
  }  
  
  printSalesData() {
    const data = this.salesSearchForm.value;
    console.log(this.formatDate(data.saleStartDate));
    console.log(this.formatDate(data.saleEndDate));
    
    var doc = new jsPDF("portrait", "px", "a4");
    doc.setFontSize(16)
    doc.setFont('Helvetica','bold');
    doc.text(`Collection Report`,10,80);
    doc.setFontSize(12);
    doc.line(5, 85, 440, 85); 
    doc.setFont('Helvetica','normal');
    doc.text(`Start date: ${this.formatDate(data.saleStartDate)}`,10,95);
    doc.text(`End date: ${this.formatDate(data.saleEndDate)}`,250,95);
    autoTable(doc, { 
      html: '#rvcTable',
      startY: 105,                    
      theme: 'plain',
      tableLineColor: [105, 105, 105],
      tableLineWidth: 0.15,
      rowPageBreak: 'avoid',
      showFoot: 'lastPage',
      margin: {
        left: 5,
        right: 7,
        bottom: 26,
        top: 80
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
    })
    doc = this.addWaterMark(doc);
    doc.save(`collection-report-${this.formatDate(data.saleStartDate)}-${this.formatDate(data.saleEndDate)}.pdf`);
  }

  printAgreementData() {
    var doc = new jsPDF("portrait", "px", "a4");
    doc.setFontSize(16)
    doc.setFont('Helvetica','bold');
    doc.text(`Agreements due for renewal as of ${this.monthNames[this.utc.getMonth()]}, ${this.mCurYear}`,10,80);
    doc.setFontSize(12);
    doc.line(5, 85, 440, 85); 
    autoTable(doc, { 
      html: '#agrTable',
      startY: 90,                    
      theme: 'plain',
      tableLineColor: [105, 105, 105],
      tableLineWidth: 0.15,
      rowPageBreak: 'avoid',
      showFoot: 'lastPage',
      margin: {
        left: 5,
        right: 7,
        bottom: 26,
        top: 80
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
    })
    doc = this.addWaterMark(doc);
    doc.save(`near-expiry-agreement-report-${this.mCMonth}-${this.mCurYear}.pdf`);  
  }

  printMembershipData() {
    var doc = new jsPDF("portrait", "px", "a4");
    doc.setFontSize(16)
    doc.setFont('Helvetica','bold');
    doc.text(`Memberhip Breakdown Report as of ${this.monthNames[this.mCMonth]}, ${this.mCurYear}`,10,80);
    doc.setFontSize(12);
    doc.line(5, 85, 440, 85); 
    autoTable(doc, { 
      html: '#membTable',
      startY: 90,                    
      theme: 'plain',
      tableLineColor: [105, 105, 105],
      tableLineWidth: 0.15,
      rowPageBreak: 'avoid',
      showFoot: 'lastPage',
      margin: {
        left: 5,
        right: 7,
        bottom: 26,
        top: 80
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
    })
    doc.text(`Member List`,10,185);
    autoTable(doc, { 
      html: '#membBreakTable',
      startY: 195,                    
      theme: 'plain',
      tableLineColor: [105, 105, 105],
      tableLineWidth: 0.15,
      rowPageBreak: 'avoid',
      showFoot: 'lastPage',
      margin: {
        left: 5,
        right: 7,
        bottom: 26,
        top: 80
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
    })
    doc = this.addWaterMark(doc);
    doc.save(`membership-breakdown-report-${this.monthNames[this.mCMonth]}-${this.mCurYear}.pdf`); 
  }

  addWaterMark(doc) {
    var totalPages = doc.internal.getNumberOfPages();
  
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setLineWidth(0.15)
      var img = new Image()
      img.src = 'assets/pics/download.png';
      doc.addImage(img, 'png', 10, 10, 50, 50);
      doc.setFontSize(16)
      doc.setFont('Helvetica','bold');
      doc.setTextColor(0,0,0);
      doc.text('AL BANDER HOTEL & RESORT',65,30);
      doc.setFontSize(12)
      doc.setFont('Helvetica','normal');
      doc.text('Building 639, Road 16, Block 615, Umm Al-Baidh, Sitra',65,40);
      doc.text(`Prepared by: ${this.firstName} ${this.lastName}`,10,620);
      doc.text(`Page ${i} of ${totalPages}`,390,620);
    }
    return doc;
  }

  formatDate(date: any) {
    var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    } 
    if (month.length < 2) {
      month = '0' + month;
    }
    return [year, month, day].join('-');
  }

  public gotoInvoiceDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

  public gotoReceiptDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }


}
