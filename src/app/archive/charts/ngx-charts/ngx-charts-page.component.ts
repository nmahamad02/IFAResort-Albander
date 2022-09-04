import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-ngx-charts-page',
  templateUrl: './ngx-charts-page.component.html',
  styleUrls: ['./ngx-charts-page.scss']
})
export class NgxChartsPageComponent {

  isBrowser: boolean;

  verticalBarOptions = {
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: true,
    showGridLines: true,
    barPadding: 50,
    showXAxisLabel: false,
    xAxisLabel: 'Country',
    showYAxisLabel: true,
    yAxisLabel: 'Sales'
  };

  horizontalBarOptions = {
    showXAxis: true,
    showYAxis: true,
    showLegend: true,
    showGridLines: false,
    barPadding: 6,
    groupPadding: 30,
    showXAxisLabel: false,
    xAxisLabel: 'Country',
    showYAxisLabel: false,
    legendPosition: 'right'
  };

  lineChartOptions = {
    showXAxis: true,
    showYAxis: true,
    showLegend: true,
    showGridLines: true,
    showXAxisLabel: false,
    showYAxisLabel: true,
    legendPosition: 'right',
    autoScale: false,
    roundDomains: true
  };

  countriesData: any[];
  countriesData2: any[];
  contestData: any[];
  lineChartData: any[];

  colorScheme = {
    domain: ['#035388', '#40c3f7', '#b3ecff', '#52606d', '#127fbf', '#9aa5b1']
  };

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.countriesData =
    [
      {
        name: 'Germany',
        value: 2500
      },
      {
        name: 'USA',
        value: 4000
      },
      {
        name: 'Spain',
        value: 1700
      },
      {
        name: 'India',
        value: 2000
      },
      {
        name: 'France',
        value: 1200
      }
    ];

    this.countriesData2 =
    [
      {
        name: 'Germany',
        series: [
          {
            name: '2020',
            value: 40632
          },
          {
            name: '2010',
            value: 36953
          },
          {
            name: '2000',
            value: 31476
          }
        ]
      },
      {
        name: 'United States',
        series: [
          {
            name: '2020',
            value: 50986
          },
          {
            name: '2010',
            value: 45986
          },
          {
            name: '2000',
            value: 37060
          }
        ]
      },
      {
        name: 'France',
        series: [
          {
            name: '2020',
            value: 36745
          },
          {
            name: '2010',
            value: 34774
          },
          {
            name: '2000',
            value: 29476
          }
        ]
      },
      {
        name: 'United Kingdom',
        series: [
          {
            name: '2020',
            value: 36240
          },
          {
            name: '2010',
            value: 32543
          },
          {
            name: '2000',
            value: 26424
          }
        ]
      }
    ];

    this.contestData =
    [
      {
        name: 'Agustin',
        value: 4000
      },
      {
        name: 'Rachel',
        value: 2500
      },
      {
        name: 'Max',
        value: 2000
      },
      {
        name: 'Nina',
        value: 1700
      },
      {
        name: 'Sollange',
        value: 1200
      }
    ];

    this.lineChartData =
    [
      {
        name: 'This week',
        series: [
          {
            value: 2303,
            name: 'Mon'
          },
          {
            value: 5616,
            name: 'Tue'
          },
          {
            value: 4862,
            name: 'Wed'
          },
          {
            value: 3658,
            name: 'Thu'
          },
          {
            value: 6089,
            name: 'Fri'
          }
        ]
      },
      {
        name: 'Last week',
        series: [
          {
            value: 2000,
            name: 'Mon'
          },
          {
            value: 4300,
            name: 'Tue'
          },
          {
            value: 5200,
            name: 'Wed'
          },
          {
            value: 3100,
            name: 'Thu'
          },
          {
            value: 4300,
            name: 'Fri'
          }
        ]
      }
    ];
  }
}
