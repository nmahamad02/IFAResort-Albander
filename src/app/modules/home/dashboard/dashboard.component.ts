import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChartConfiguration } from 'chart.js';
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  agrChartData: any[] = [];
  memChartData: any[] = [];
  invChartData: any[] = [];
  rvcChartData: any[] = [];
  yearChartLabels: any[] = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'
  ];
  membChartLabels: any[] = [
    'Corporate Members',
    'Family Members',
    'Single Members', 
  ];

  chartOptions = {
    responsive: true
  };

  introVidSrc = "https://ifaresort-images.s3.me-south-1.amazonaws.com/videos/Introduction.mov"
  authVidSrc = "https://ifaresort-images.s3.me-south-1.amazonaws.com/videos/authentication.mov"
  dashVidSrc = "https://ifaresort-images.s3.me-south-1.amazonaws.com/videos/dashboard.mov"
  membVidSrc = "https://ifaresort-images.s3.me-south-1.amazonaws.com/videos/members.mov"
  agrVidSrc = "https://ifaresort-images.s3.me-south-1.amazonaws.com/videos/agreements.mov"
  invVidSrc = "https://ifaresort-images.s3.me-south-1.amazonaws.com/videos/invoices.mov"
  rvcVidSrc = "https://ifaresort-images.s3.me-south-1.amazonaws.com/videos/receipts.mov"
  srvVidSrc = "https://ifaresort-images.s3.me-south-1.amazonaws.com/videos/authentication.mov"

  constructor(private reportsService: ReportsService, private router: Router) { }

  ngOnInit() {
    this.getAgrData();
    this.getMemData();
    this.getInvData();
    this.getRvcData();
  }

  getAgrData() {
    this.reportsService.getyearLyExpiringAgreements().subscribe((res: any) => {
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
      this.agrChartData = [
        {
          data: dataArr,
          label: 'Expiring agreements'
        }
      ]
    }, (err: any) => {
      console.log(err);
    })
  }
  
  getMemData() {
    this.reportsService.getmemberTypesChart().subscribe((res: any) => {
      this.memChartData = [
        {
          data: [
            res.recordset[0].countcorporate, 
            res.recordset[0].countfamily,
            res.recordset[0].countsingle
          ]
        }
      ]
    }, (err: any) => {
      console.log(err);
    })
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

  public gotoReportDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

}
