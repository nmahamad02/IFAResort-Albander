import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LookupService {
  private url = 'http://15.185.46.105:5000/api';

  constructor(private http:HttpClient) { }

  getAllNations(){
    return this.http.get(this.url + '/lookup/nations')
  }

  getAllTitles(){
    return this.http.get(this.url + '/lookup/titles')
  }

  getRefcode(pcode: string){
    return this.http.get(this.url + '/lookup/ref/' + pcode )
  }

  getAllRelations(){
    return this.http.get(this.url + '/lookup/relations')
  }

  getAllPositions(){
    return this.http.get(this.url + '/lookup/positions')
  }

  getAllRef(){
    return this.http.get(this.url + '/lookup/getReferenceType')
  }

  searchReference(){
    return this.http.get(this.url + '/lookup/searchReference')
  }

  

  
}
