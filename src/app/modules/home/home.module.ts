import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { ReportsComponent } from './reports/reports.component';

export const homeRoutes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
  {
    path: 'reports/:type',
    component: ReportsComponent
  }
];

@NgModule({
  declarations: [DashboardComponent, AccountComponent, ReportsComponent],
  imports: [
    CommonModule,
    ChartsModule,
    MatIconModule,
    RouterModule.forChild(homeRoutes)
  ],
  providers: [
    ThemeService
  ]
})
export class HomeModule { }
