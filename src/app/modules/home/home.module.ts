import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ChartsModule, ThemeService } from 'ng2-charts';

export const homeRoutes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'account',
    component: AccountComponent
  },
];

@NgModule({
  declarations: [DashboardComponent, AccountComponent],
  imports: [
    CommonModule,
    ChartsModule,
    RouterModule.forChild(homeRoutes)
  ],
  providers: [
    ThemeService
  ]
})
export class HomeModule { }
