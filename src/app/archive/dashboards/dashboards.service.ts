import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardsService {

  constructor(private http: HttpClient) {}

  // ecommerce dashboard
  getRecentOrdersTableData(): Observable<any> {
    return this.http.get('/assets/data/ecommerce-dashboard/recent-orders-table.json');
  }

  getLatestTicketsTableData(): Observable<any> {
    return this.http.get('/assets/data/ecommerce-dashboard/latest-tickets-table.json');
  }

  // crm dashboard
  getLeadsTableData(): Observable<any> {
    return this.http.get('/assets/data/crm-dashboard/leads-table.json');
  }

  getTopSellersData(): Observable<any> {
    return this.http.get('/assets/data/crm-dashboard/top-sellers.json');
  }

  getLaggingSellersData(): Observable<any> {
    return this.http.get('/assets/data/crm-dashboard/lagging-sellers.json');
  }

  getArticles(): Observable<any> {
    return this.http.get('/assets/data/crm-dashboard/articles.json');
  }

  getTasks(): Observable<any> {
    return this.http.get('/assets/data/crm-dashboard/tasks.json');
  }
}
