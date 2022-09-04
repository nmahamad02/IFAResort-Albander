import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  private url = 'http://15.185.46.105:5000/api';

  constructor(private http: HttpClient) { }

  getReceivablesAgeing(date: string) {
    return this.http.get(this.url + '/receivables/ageing/' + date)
  }

  getOutstanding() {
    
  }

}
