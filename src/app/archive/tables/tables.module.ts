import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { DragDropModule } from '@angular/cdk/drag-drop';

import { RegularTablesComponent } from './regular-tables/regular-tables.component';
import { RegularTablesResolver, ExtendedTablesResolver, SmartTablesResolver, ExternalFiltersTableResolver } from './tables.resolver';
import { TableDataService } from './table-data.service';
import { ExtendedTablesComponent } from './extended-tables/extended-tables.component';
import { SmartTablesComponent } from './smart-tables/smart-tables.component';
import { ExternalFiltersTableComponent } from './external-filters-table/external-filters-table.component';

export const tablesRoutes = [
  {
    path: '',
    redirectTo: 'regular-tables'
  },
  {
    path: 'regular-tables',
    component: RegularTablesComponent,
    resolve: {
      tableData : RegularTablesResolver
    }
  },
  {
    path: 'extended-tables',
    component: ExtendedTablesComponent,
    resolve: {
      tableData : ExtendedTablesResolver
    }
  },
  {
    path: 'smart-tables',
    component: SmartTablesComponent,
    resolve: {
      tableData : SmartTablesResolver
    }
  },
  {
    path: 'external-filters-tables',
    component: ExternalFiltersTableComponent,
    resolve: {
      tableData : ExternalFiltersTableResolver
    }
  }
];

@NgModule({
  declarations: [
    RegularTablesComponent,
    ExtendedTablesComponent,
    SmartTablesComponent,
    ExternalFiltersTableComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DragDropModule,
    RouterModule.forChild(tablesRoutes)
  ],
  providers: [
    TableDataService,
    RegularTablesResolver,
    ExtendedTablesResolver,
    SmartTablesResolver,
    ExternalFiltersTableResolver
  ]
})

export class TablesModule { }
