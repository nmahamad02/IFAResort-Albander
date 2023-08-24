import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  showSales = false

  monthData: any[] = []
  monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

  invChartData: any[] = [];
  rvcChartData: any[] = [];
  yearChartLabels: any[] = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];

  chartOptions = {
    responsive: true
  };

  mCMonth = new Date().getMonth();
  mCurYear = new Date().getFullYear();

  constructor(private route: ActivatedRoute, private reportsService: ReportsService, private financeService: FinanceService, private crmService: CrmService, private router: Router) { 
    if(this.mType === 'billing') {
      this.mReportType = "Monthly Billing";
      this.showBilling = true
    } else if (this.mType === 'sales') {
      this.mReportType = "Monthly Sales";
      this.showSales = true
    }
  }

  ngOnInit() {
    this.getData();
    this.getInvData();
    this.getRvcData();
  }

  getData() {
    if(this.mType === 'billing') {
      for(let i=0; i<=this.mCMonth; i++){
        this.reportsService.getMonthlyInvoices(String(i+1)).subscribe((res: any) => {
          var totSum = 0
          for(let j=0; j<res.recordset.length; j++) {
            totSum += res.recordset[j].AMOUNT
          }
          var newMonth = {
            INDEX: i+1,
            MONTH: this.monthNames[i],
            ARR: res.recordset,
            SUM: totSum
          }
          this.monthData.push(newMonth)
        }, (err: any) => {
          var newMonth = {
            INDEX: i+1,
            MONTH: this.monthNames[i],
            ARR: [],
            SUM: 0
          }
          this.monthData.push(newMonth)
        })
      }
    } else if (this.mType === 'sales') {
      for(let i=0; i<=this.mCMonth; i++){
        this.reportsService.getMonthlyReceipts(String(i+1)).subscribe((res: any) => {
          var totSum = 0
          for(let j=0; j<res.recordset.length; j++) {
            totSum += res.recordset[j].AMOUNT
          }
          var newMonth = {
            INDEX: i+1,
            MONTH: this.monthNames[i],
            ARR: res.recordset,
            SUM: totSum
          }
          this.monthData.push(newMonth)
        }, (err: any) => {
          var newMonth = {
            INDEX: i+1,
            MONTH: this.monthNames[i],
            ARR: [],
            SUM: 0
          }
          this.monthData.push(newMonth)
        })
      }    
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
