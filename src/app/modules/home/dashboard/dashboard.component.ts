import { Component, OnInit } from '@angular/core';
import { ChartConfiguration } from 'chart.js';
import { ReportsService } from 'src/app/services/reports/reports.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /*chartData = [
    {
      data: [330, 600, 260, 700],
      label: 'Account A'
    },
    {
      data: [120, 455, 100, 340],
      label: 'Account B'
    },
    {
      data: [45, 67, 800, 500],
      label: 'Account C'
    }
  ];

  chartLabels = [
    'January',
    'February',
    'March',
    'April'
  ];*/

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

  constructor(private reportsService: ReportsService) { }

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


}
