import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TableDataService } from './table-data.service';

@Injectable()
export class RegularTablesResolver implements Resolve<any> {

  constructor(private tableDataService: TableDataService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.tableDataService.getRegularTableData()
      .subscribe((tableData: any) => {
        return resolve(tableData);
      });
    });
  }
}

@Injectable()
export class ExtendedTablesResolver implements Resolve<any> {

  constructor(private tableDataService: TableDataService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.tableDataService.getExtendedTableData()
      .subscribe((tableData: any) => {
        return resolve(tableData);
      });
    });
  }
}

@Injectable()
export class SmartTablesResolver implements Resolve<any> {

  constructor(private tableDataService: TableDataService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.tableDataService.getSmartTableData()
      .subscribe((tableData: any) => {
        return resolve(tableData);
      });
    });
  }
}

@Injectable()
export class ExternalFiltersTableResolver implements Resolve<any> {

  constructor(private tableDataService: TableDataService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.tableDataService.getRecentOrdersTableData()
      .subscribe((recentOrdersData: any) => {
        return resolve(recentOrdersData);
      });
    });
  }
}
