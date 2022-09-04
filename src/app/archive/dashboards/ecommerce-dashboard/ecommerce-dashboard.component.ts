import { Component, PLATFORM_ID, Inject, ViewChild, OnInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import * as echarts from 'echarts/lib/echarts';
/** echarts theme: */
import '../../../../theme/echarts-theme.js';
import { ActivatedRoute } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-ecommerce-dashboard',
  templateUrl: './ecommerce-dashboard.component.html',
  styleUrls: [
    './styles/ecommerce-dashboard.component.scss',
    './styles/ecommerce-dashboard.responsive.scss'
  ]
})
export class EcommerceDashboardComponent implements OnInit {

  isBrowser: boolean;
  values: any;
  chartColors: any = {
    success: '#28a745',
    error: '#dc3545',
    neutral: '#666d77',
    white: '#ffffff',
    blue3: '#bad4ff',
    blue4: '#a2c5ff',
    blue5: '#86b4ff',
    blue7: '#3b86fe',
    blue8: '#2e69c9',
    blue9: '#1b3e76'
  };

  recentOrdersTableDisplayedColumns: string[] = ['id', 'product', 'category', 'location', 'customer', 'price', 'date', 'status'];
  recentOrdersTableDataSource: any;

  latestTicketsTableDisplayedColumns: string[] = ['name', 'ticket_id', 'subject', 'phone', 'created_date', 'status'];
  latestTicketsTableDataSource: any;

  @ViewChild('recentOrdersSort', {static: true}) recentOrdersSort: MatSort;
  @ViewChild('latestTicketsSort', {static: true}) latestTicketsSort: MatSort;
  @ViewChild('latestTicketsPaginator', {static: true}) latestTicketsPaginator: MatPaginator;


  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private route: ActivatedRoute
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    // tslint:disable-next-line:no-string-literal
    this.recentOrdersTableDataSource = new MatTableDataSource(route.snapshot.data['data'].recentOrdersData);
    // tslint:disable-next-line:no-string-literal
    this.latestTicketsTableDataSource =  new MatTableDataSource(route.snapshot.data['data'].latestTicketsData);

    this.values = [
      {
        name: 'Orders',
        value: '7500',
        icon: 'orders',
        trend: 6.2,
        miniChartOptions: this.ordersMiniChartOptions
      },
      {
        name: 'Sales',
        value: '$38.100',
        icon: 'sales',
        trend: 8.5,
        miniChartOptions: this.salesMiniChartOptions
      },
      {
        name: 'Earnings',
        value: '$23.500',
        icon: 'earnings',
        trend: -10,
        miniChartOptions: this.earningsMiniChartOptions
      },
      {
        name: 'Commissions',
        value: '$15.600',
        icon: 'commissions-paid',
        trend: 0,
        miniChartOptions: this.commisionsPaidMiniChartOptions
      }
    ];
  }

  earningsMiniChartOptions = {
    grid: {
      show: true,
      borderWidth: 0,
      bottom: '80%'
    },
    xAxis : [
      {
        type: 'category',
        show: false,
        boundaryGap: false
      }
    ],
    yAxis : [
      {
        type: 'value',
        show: false
      }
    ],
    series: [
      {
        name: 'mini chart',
        type: 'line',
        smooth: true,
        data: [23, 16, 25, 16, 20, 14],
        showSymbol: false,
        itemStyle: {
          color: this.chartColors.error
        }
      }
    ]
  };

  commisionsPaidMiniChartOptions = {
    grid: {
      show: true,
      borderWidth: 0,
      bottom: '80%'
    },
    xAxis : [
      {
        type: 'category',
        show: false,
        boundaryGap: false
      }
    ],
    yAxis : [
      {
        type: 'value',
        show: false
      }
    ],
    series: [
      {
        name: 'mini chart',
        type: 'line',
        smooth: true,
        data: [19, 22, 21, 20, 22, 20],
        showSymbol: false,
        itemStyle: {
          color: this.chartColors.error
        }
      }
    ]
  };

  ordersMiniChartOptions = {
    grid: {
      show: true,
      borderWidth: 0,
      bottom: '80%'
    },
    xAxis : [
      {
        type: 'category',
        show: false,
        boundaryGap: false
      }
    ],
    yAxis : [
      {
        type: 'value',
        show: false
      }
    ],
    series: [
      {
        name: 'mini chart',
        type: 'line',
        smooth: true,
        data: [10, 13, 18, 16, 15, 21],
        showSymbol: false,
        itemStyle: {
          color: this.chartColors.neutral
        }
      }
    ]
  };

  salesMiniChartOptions = {
    grid: {
      show: true,
      borderWidth: 0,
      bottom: '80%'
    },
    xAxis : [
      {
        type: 'category',
        show: false,
        boundaryGap: false
      }
    ],
    yAxis : [
      {
        type: 'value',
        show: false
      }
    ],
    series: [
      {
        name: 'mini chart',
        type: 'line',
        smooth: true,
        data: [17, 13, 16, 17, 19, 20],
        showSymbol: false,
        itemStyle: {
          color: this.chartColors.success
        }
      }
    ]
  };

  salesChartOptions = {
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    grid: {
      left: '0',
      right: '2px',
      top: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June'],
      boundaryGap: false,
      splitLine: {
        lineStyle: {
          type: 'solid'
        }
      }
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '${value}'
      },
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'solid'
        }
      }
    },
    legend: {
      type: 'plain',
      orient: 'horizontal',
      bottom: 0,
      icon: 'circle'
    },
    series: [
      {
        name: 'Sales',
        data: [23000, 16000, 25000, 20000, 23000, 18000],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        itemStyle: {
          normal: {
            color: this.chartColors.blue4
          }
        },
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: this.chartColors.blue4
            }, {
              offset: 1,
              color: this.chartColors.white
            }])
          }
        },
        lineStyle: {
          normal: {
            color: this.chartColors.blue4
          }
        }
      },
      {
        name: 'Earnings',
        data: [15000, 10000, 15000, 13000, 15000, 12000],
        type: 'line',
        smooth: true,
        symbol: 'circle',
        areaStyle: {
          normal: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
              offset: 0,
              color: this.chartColors.blue8
            }, {
              offset: 1,
              color: this.chartColors.white
            }])
          }
        },
        itemStyle: {
          normal: {
            color: this.chartColors.blue8
          }
        },
        lineStyle: {
          normal: {
            color: this.chartColors.blue8
          }
        }
      }
    ]
  };

  ordersChartOptions = {
    tooltip : {
      position: 'top',
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
    },
    grid: {
      left: 'left',
      containLabel: true
    },
    legend: {
      type: 'plain',
      orient: 'horizontal',
      bottom: 0,
      icon: 'circle'
    },
    xAxis: {
      axisLine: {
        show: false
      },
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      silent: false,
      splitLine: {
        show: false
      },
    },
    yAxis: {
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'solid'
        }
      }
    },
    series : [
      {
        name: 'Direct',
        type: 'bar',
        data: [700, 500, 590, 800, 550, 600, 571, 600, 700, 790, 950, 790],
        animationDelay: (idx) => idx * 10,
        itemStyle: {
          barBorderRadius: [8, 8, 0, 0],
          color: this.chartColors.blue8
        },
        barMaxWidth: 8
      },
      {
        name: 'Afilliate Driven',
        type: 'bar',
        data: [300, 350, 420, 370, 390, 370, 400, 421, 589, 650, 500, 400],
        animationDelay: (idx) => idx * 10,
        itemStyle: {
          barBorderRadius: [8, 8, 0, 0],
          color: this.chartColors.blue4
        },
        barMaxWidth: 8
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => idx * 5
  };

  devicesChartOptions = {
    // Set all coordinates to 0 to remove white padding around chart
    grid: {
      top: 0,
      left: 0,
      right: 0,
      bottom: 0
    },
    legend: {
      show: false
    },
    series: [
      {
        type: 'pie',
        radius: ['90%', '100%'], // [inner radius, outer radius]
        data: [
          {value: 42, name: 'Desktop', itemStyle: { color: '#3b86ff'}},
          {value: 18, name: 'Audio', itemStyle: { color: '#FF0E18'}},
          {value: 8, name: 'Smartwatch', itemStyle: { color: '#38D997'}},
          {value: 32, name: 'Mobile', itemStyle: { color: '#ffc200'}}
        ],
        animation: false,
        label: {
          normal: {
            show: false,
            position: 'center'
          },
          emphasis: {
            show: true,
            textStyle: {
              fontSize: '36'
            },
            formatter: '{c}%'
          }
        },
      }
    ]
  };

  topSellingCategoriesChartOptions = {
    tooltip : {
      position: 'top',
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
    },
    grid: {
      left: 'left',
      containLabel: true
    },
    legend: {
      type: 'plain',
      orient: 'horizontal',
      bottom: 0,
      icon: 'circle'
    },
    xAxis: {
      axisLine: {
        show: false
      },
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      silent: false,
      splitLine: {
        show: false
      },
    },
    yAxis: {
      axisTick: {
        show: false
      },
      axisLabel: {
        formatter: '${value}'
      },
      splitNumber: 4,
      axisLine: {
        show: false
      },
      splitLine: {
        lineStyle: {
          type: 'solid'
        }
      }
    },
    series : [
      {
        name: 'Cell Phones',
        type: 'bar',
        stack: 'total',
        data: [500, 400, 300, 500, 350, 400, 671, 500, 600, 620, 590, 640],
        animationDelay: (idx) => idx * 10,
        barMaxWidth: 10,
        itemStyle: {
          color: this.chartColors.blue3
        }
      },
      {
        name: 'Clothing',
        type: 'bar',
        stack: 'total',
        data: [300, 450, 150, 370, 190, 310, 400, 321, 340, 450, 500, 500],
        animationDelay: (idx) => idx * 10,
        barMaxWidth: 10,
        itemStyle: {
          color: this.chartColors.blue5
        }
      },
      {
        name: 'Computers',
        type: 'bar',
        stack: 'total',
        data: [100, 200, 150, 230, 190, 240, 270, 230, 200, 190, 240, 220],
        animationDelay: (idx) => idx * 10,
        barMaxWidth: 10,
        itemStyle: {
          color: this.chartColors.blue8
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => idx * 5
  };

  referralSourceChartOptions = {
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      type: 'plain',
      orient: 'horizontal',
      icon: 'circle',
      data: ['Social Networks', 'Google Search', 'Medium', 'Email'],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis : [
      {
        type: 'category',
        boundaryGap: false,
        data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'],
      }
    ],
    yAxis : [
      {
        type: 'value',
        name: 'Users'
      }
    ],
    series: [
      {
        name: 'Social Networks',
        type: 'line',
        data: [120, 132, 101, 134, 90, 230, 210, 240, 250, 220, 201, 250],
        symbol: 'circle',
        itemStyle: {
          normal: {
            color: this.chartColors.blue3
          }
        }
      },
      {
        name: 'Google Search',
        type: 'line',
        data: [150, 232, 201, 154, 190, 330, 410, 440, 478, 510, 550, 470],
        symbol: 'circle',
        itemStyle: {
          normal: {
            color: this.chartColors.blue5
          }
        }
      },
      {
        name: 'Medium',
        type: 'line',
        data: [320, 332, 301, 334, 390, 330, 320, 330, 300, 380, 400, 390],
        symbol: 'circle',
        itemStyle: {
          normal: {
            color: this.chartColors.blue8
          }
        }
      },
      {
        name: 'Email',
        type: 'line',
        data: [420, 532, 501, 534, 690, 730, 620, 770, 750, 810, 869, 900],
        symbol: 'circle',
        itemStyle: {
          normal: {
            color: this.chartColors.blue9
          }
        }
      }
    ]
  };

  salesTodayChartOptions = {
    tooltip : {
      show: false
    },
    legend: {
      show: false
    },
    xAxis: {
      show: false,
      data: this.generateSalesTodayXAxis(30),
      boundaryGap: false
    },
    yAxis: {
      show: false
    },
    grid: {
      left: 6,
      top: 0,
      right: 6,
      bottom: 0
    },
    series : [
      {
        type: 'bar',
        // tslint:disable-next-line:max-line-length
        data: [50, 100, 200, 300, 400, 300, 460, 430, 379, 330, 200, 120, 230, 350, 400, 100, 150, 130, 260, 471, 500, 420, 300, 100, 140, 190, 250, 330, 400],
        animationDelay: (idx) => idx * 10,
        barMaxWidth: 6,
        itemStyle: {
          color: '#695c5c99'
        },
        emphasis: {
          itemStyle: {
            color: '#695C5C'
          }
        }
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => idx * 5
  };

  ngOnInit() {

    // define a custom sort for the date field
    this.recentOrdersTableDataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'date': return new Date(item.date);
        default: return item[property];
      }
    };
    this.recentOrdersTableDataSource.sort = this.recentOrdersSort;

    // define a custom sort for the date field
    this.latestTicketsTableDataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case 'created_date': return new Date(item.created_date);
        default: return item[property];
      }
    };
    this.latestTicketsTableDataSource.sort = this.latestTicketsSort;

    this.latestTicketsTableDataSource.paginator = this.latestTicketsPaginator;
  }

  generateSalesTodayXAxis(items: number) {
    const data = [];
    for (let i = 1; i < items; i++) {
      data.push(i.toString());
    }
    return data;
  }
}
