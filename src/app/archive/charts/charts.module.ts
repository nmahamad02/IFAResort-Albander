import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { ChartsDataService } from './charts.service';

// echarts - lib: https://github.com/xieziyu/ngx-echarts
import { NgxEchartsModule } from 'ngx-echarts';
import { EchartsPageComponent } from './echarts/echarts-page.component';

// chartjs - lib: https://github.com/valor-software/ng2-charts
import { ChartsJsPageComponent } from './chartjs/chartjs-page.component';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts';

// ngx-charts - lib: https://swimlane.gitbook.io/ngx-charts/
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxChartsPageComponent } from './ngx-charts/ngx-charts-page.component';

export const chartsRoutes = [
  {
    path: '',
    redirectTo: 'echarts'
  },
  {
    path: 'echarts',
    component: EchartsPageComponent
  },
  {
    path: 'chart-js',
    component: ChartsJsPageComponent
  },
  {
    path: 'ngx-charts',
    component: NgxChartsPageComponent
  }
];

@NgModule({
  declarations: [
    EchartsPageComponent,
    ChartsJsPageComponent,
    NgxChartsPageComponent
  ],

  providers: [
    ChartsDataService
  ],

  imports: [
    RouterModule.forChild(chartsRoutes),
    CommonModule,
    SharedModule,
    NgxEchartsModule,
    NgxChartsModule,
    Ng2ChartsModule
  ]
})
export class ChartsModule { }
