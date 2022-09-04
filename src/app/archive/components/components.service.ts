import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ComponentsService {

  constructor(private http: HttpClient) {}

  // cards
  getCardsPageData(): Observable<any> {
    return this.http.get('/assets/data/components/cards.json');
  }

  // lists
  getListsPageData(): Observable<any> {
    return this.http.get('/assets/data/components/lists.json');
  }
}
