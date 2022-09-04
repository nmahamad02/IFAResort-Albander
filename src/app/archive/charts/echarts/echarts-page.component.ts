import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
/** echarts theme: */
import '../../../../theme/echarts-theme.js';

@Component({
  selector: 'app-echarts-page',
  templateUrl: './echarts-page.component.html',
  styleUrls: [
    './echarts-page.component.scss'
  ]
})

export class EchartsPageComponent {
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  multiplePieChartOption = {
    tooltip : {
      trigger: 'none'
    },
    legend: {
      type: 'plain',
      orient: 'vertical',
      icon: 'circle',
      left: 'left',
      data: ['Development', 'Design', 'Testing']
    },
    series: [{
      name: 'Development',
      type: 'pie',
      clockwise: true,
      hoverAnimation: false,
      radius: [105, 130],
      itemStyle: {
        normal:
        {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      data: [
        {
          value: 68,
          name: 'Development'
        },
        {
          value: 32,
          name: 'invisible',
          itemStyle: {
            color: '#FFF',
            barBorderRadius: 6
          },
          emphasis: {
            itemStyle: {
              color: '#FFF',
              label: {
                show: false
              },
              labelLine: {
                show: false
              }
            }
          }
        }
      ]
    }, {
      name: 'Design',
      type: 'pie',
      clockwise: true,
      hoverAnimation: false,
      radius: [75, 100],
      itemStyle: {
        normal:
        {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      data: [
        {
          value: 50,
          name: 'Design'
        },
        {
          value: 71,
          name: 'invisible',
          itemStyle: {
            color: '#FFF'
          }
        }
      ]
    }, {
      name: 'Testing',
      type: 'pie',
      clockwise: true,
      hoverAnimation: false,
      radius: [45, 70],
      itemStyle: {
        normal:
        {
          label: {
            show: false
          },
          labelLine: {
            show: false
          }
        }
      },
      data: [
        {
          value: 40,
          name: 'Testing'
        }, {
          value: 97,
          name: 'invisible',
          itemStyle: {
            color: '#FFF'
          }
        }
      ]
    }
  ]};

  multipleLineChartOption = {
    tooltip : {
      trigger: 'item',
      formatter: '{c}'
    },
    xAxis: {
      type: 'category',
      axisLine: {
        show: false
      },
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      splitLine: {
        show: false
      },
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      splitNumber: 4,
      axisLine: {
        show: false
      },
    },
    legend: {
      type: 'plain',
      orient: 'horizontal',
      bottom: 0,
    },
    series: [
      {
        name: 'This week',
        data: [680, 932, 901, 934, 1290, 1330, 1320],
        type: 'line'
      },
      {
        name: 'Last week',
        data: [620, 999, 1003, 1200, 1100, 1200, 1500],
        type: 'line',
        lineStyle: {
          normal: {
            color: 'grey',
            type: 'dashed'
          }
        },
      }
    ]
  };

  pieChartOption = {
    tooltip : {
      trigger: 'item',
      formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'right',
      data: ['USA', 'Brazil', 'India', 'France', 'UK'],
    },
    series: [
      {
        name: 'Transactions',
        type: 'pie',
        radius: '80%',
        center: ['50%', '50%'],
        data: [
          {
            name: 'USA',
            value: 500
          },
          {
            name: 'Brazil',
            value: 300
          },
          {
            name: 'India',
            value: 200
          },
          {
            name: 'France',
            value: 100
          },
          {
            name: 'UK',
            value: 100
          }
        ],
        itemStyle: {
          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: '#ccc'
          }
        },
        label: {
          normal: {
            textStyle: {
              color: '#999999'
            },
          },
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: '#999999'
            },
          },
        }
      }
    ]
  };

  barChartOption = {
    tooltip : {
      position: 'top',
      trigger: 'axis',
      axisPointer: {
        type: 'none'
      },
    },
    legend: {
      type: 'plain',
      orient: 'vertical',
      right: 0,
      top: 0,
      data: [
        {
          name: 'Product 1',
          icon: 'circle'
        },
        {
          name: 'Product 2',
          icon: 'circle'
        }
      ]
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
      splitNumber: 4,
      axisLine: {
        show: false
      },
    },
    series : [
      {
        name: 'Product 1',
        type: 'bar',
        data: [600, 400, 300, 500, 350, 400, 471, 500, 600, 700, 590, 490],
        animationDelay: (idx) => idx * 10,
        itemStyle: {
          barBorderRadius: 6
        },
        barMaxWidth: 10
      },
      {
        name: 'Product 2',
        type: 'bar',
        data: [300, 450, 320, 370, 290, 370, 500, 621, 789, 650, 599, 700],
        animationDelay: (idx) => idx * 10,
        itemStyle: {
          barBorderRadius: 6
        },
        barMaxWidth: 10
      }
    ],
    animationEasing: 'elasticOut',
    animationDelayUpdate: (idx) => idx * 5
  };

  areaStackChartOption = {
    tooltip : {
      trigger: 'axis',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {
      data: ['Twitter', 'Facebook', 'Google', 'Medium', 'Email'],
    },
    toolbox: {
      feature: {
        saveAsImage: {
          title: 'Download'
        }
      }
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
        name: 'Twitter',
        type: 'line',
        stack: 'a',
        areaStyle: {},
        data: [120, 132, 101, 134, 90, 230, 210, 240, 250, 220, 201, 250]
      },
      {
        name: 'Facebook',
        type: 'line',
        stack: 'a',
        areaStyle: {},
        data: [220, 182, 191, 234, 290, 330, 310, 334, 356, 310, 330, 320]
      },
      {
        name: 'Google',
        type: 'line',
        stack: 'a',
        areaStyle: {},
        data: [150, 232, 201, 154, 190, 330, 410, 440, 478, 510, 550, 470]
      },
      {
        name: 'Medium',
        type: 'line',
        stack: 'a',
        areaStyle: {normal: {}},
        data: [320, 332, 301, 334, 390, 330, 320, 330, 300, 380, 400, 390]
      },
      {
        name: 'Email',
        type: 'line',
        stack: 'a',
        label: {
          normal: {
            show: true,
            position: 'top'
          }
        },
        areaStyle: {normal: {}},
        data: [620, 732, 701, 734, 990, 1130, 1120, 1170, 1250, 1299, 1310, 1360]
      }
    ]
  };

  doughnutChartOption = {
    color: ['#EF4E4E', '#FF9B9B', '#FFE3E3'],
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'horizontal',
      type: 'plain',
      bottom: 0,
      data: [
        {
          name: 'Desktop',
          icon: 'circle'
        },
        {
          name: 'Tablet',
          icon: 'circle'
        },
        {
          name: 'Mobile',
          icon: 'circle'
        }
      ]
    },
    series: [
      {
        type: 'pie',
        radius: ['60%', '70%'],
        avoidLabelOverlap: false,
        label: {
          show: false
        },
        data: [
          {value: 335, name: 'Desktop'},
          {value: 310, name: 'Mobile'},
          {value: 234, name: 'Tablet'}
        ],
        itemStyle: {
          normal: {
            borderWidth: 4,
            borderColor: '#FFFFFF'
          }
        }
      }
    ]
  };

  smoothLineOption = {
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
      type: 'value',
      axisTick: {
        show: false
      },
      splitNumber: 5,
      axisLabel: {
        formatter: '${value}k',
        fontWeight: 'bold'
      },
      axisLine: {
        show: false
      },
    },
    series: [{
      data: [0, 10, 5, 15, 10, 20, 15, 25, 20, 30, 25, 40],
      type: 'line',
      smooth: true,
      lineStyle: {
        color: '#2c7be5',
        width: 3
      },
      symbol: 'none'
    }]
  };

}
