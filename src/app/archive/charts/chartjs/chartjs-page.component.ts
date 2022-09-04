import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ChartDataSets, ChartOptions, ChartType, RadialChartOptions } from 'chart.js';
import { SingleDataSet, Color, Label, ThemeService } from 'ng2-charts';
import * as Chart from 'chart.js';

@Component({
  selector: 'app-chartjs-page',
  templateUrl: './chartjs-page.component.html',
  styleUrls: ['./chartjs-page.scss']
})
export class ChartsJsPageComponent {
  isBrowser: boolean;

  // Line Chart
  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Transactions' },
  ];
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  public lineChartOptions: ChartOptions = {
    responsive: true
  };
  public lineChartColors: Color[] = [
    {
      borderColor: '#035388',
      backgroundColor: 'rgba(3,83,136,0.4)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  // Pie Chart
  public pieChartOptions: ChartOptions = {
    responsive: true,
    legend: {
      position: 'right'
    }
  };
  public pieChartLabels: Label[] = ['In Store Sales', 'Website Sales', 'Email Sales'];
  public pieChartData: SingleDataSet = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['#035388', '#40c3f7', '#b3ecff'],
    },
  ];

  // Bar Chart
  public barChartOptions: ChartOptions = {
    responsive: true
  };
  public barChartLabels: Label[] = ['2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    {
      data: [165, 159, 180, 181, 156, 155, 140, 200],
      label: 'Product A',
      backgroundColor: '#035388',
      borderColor: '#035388',
      hoverBackgroundColor: 'rgb(81,107,145)',
      hoverBorderColor: 'rgb(81,107,145)'
    },
    {
      data: [128, 148, 140, 139, 186, 127, 190, 230],
      label: 'Product B',
      backgroundColor: '#40c3f7',
      borderColor: '#40c3f7'
    }
  ];

  // Doughnut
  public doughnutChartLabels: Label[] = ['Mobile', 'Desktop', 'Tablet'];
  public doughnutChartData = [250, 130, 50];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartColors = [
    {
      backgroundColor: ['#035388', '#40c3f7', '#b3ecff'],
    },
  ];

  // Radar
  public radarChartOptions: RadialChartOptions = {
    responsive: true,
  };
  public radarChartLabels: Label[] = ['Coding', 'Designing', 'Testing', 'Refactoring', 'Meetings', 'Discovery'];

  public radarChartData: ChartDataSets[] = [
    {
      data: [80, 59, 70, 30, 46, 15],
      label: 'Admin Template'
    },
    {
      data: [60, 48, 20, 19, 16, 50],
      label: 'Site Template'
    }
  ];
  public radarChartType: ChartType = 'radar';


  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private themeService: ThemeService
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.setTheme();
  }

  public setTheme() {

    const overrides: ChartOptions = {
      legend: {
        labels: {
          fontColor: '#999999',
          boxWidth: 20,
          padding: 20
        },
      },
      scales: {
        xAxes: [{
          ticks: { fontColor: '#999999' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }],
        yAxes: [{
          ticks: { fontColor: '#999999' },
          gridLines: { color: 'rgba(255,255,255,0.1)' }
        }]
      },
      tooltips: {
        enabled: true,
        backgroundColor: '#FFF',
        titleFontColor: '#999999',
        bodyFontColor: '#999999',
        caretPadding: 4,
        xPadding: 10,
        yPadding: 10,
        borderColor: '#999999',
        borderWidth: 1
      }
    };
    Chart.defaults.global.defaultFontColor = '#999999';
    Chart.defaults.global.defaultFontFamily = 'Nunito, sans-serif';
    Chart.defaults.global.responsive = true;

    this.themeService.setColorschemesOptions(overrides);
  }

}
