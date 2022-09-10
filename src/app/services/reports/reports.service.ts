import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private url = 'http://15.185.46.105:5000/api/reports';

  constructor(private http: HttpClient) { }

  getReceivablesAgeing(date: string) {
    return this.http.get(this.url + '/receivables/ageing/' + date)
  }

  getOutstanding() {
    
  }

  getMembersByType() {
    return this.http.get(this.url + '/memberTypes')
  }  
  
  getmemberTypesChart() {
    return this.http.get(this.url + '/memberTypesChart')
  }  
  
  getyearLyExpiringAgreements() {
    return this.http.get(this.url + '/yearLyExpiringAgreements')
  }  
  
  getyearlyInvoices() {
    return this.http.get(this.url + '/yearlyInvoices')
  }  
  
  getyearlyReceipts() {
    return this.http.get(this.url + '/yearlyReceipts')
  }

}
