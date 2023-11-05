import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { ChartsModule, ThemeService } from 'ng2-charts';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { ReportsComponent } from './reports/reports.component';
import { MatButtonModule, MatCardModule, MatDatepickerModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatNativeDateModule, MatPaginatorModule, MatSelectModule, MatSnackBarModule, MatSortModule, MatTableModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableExporterModule } from 'mat-table-exporter';

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
    MatTabsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    RouterModule.forChild(homeRoutes)
  ],
  providers: [
    ThemeService
  ]
})
export class HomeModule { }
