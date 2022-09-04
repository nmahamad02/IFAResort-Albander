
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, TemplateRef, ViewChild } from '@angular/core';

export class ClubserviceService {
  private url = 'http://15.185.46.105:5000/api/';
  
  constructor(private http: HttpClient) { 
  }

  searchBoatMaster(boatmasterid: any){
    return this.http.get(this.url + 'club/SearchBoatMaster/' + boatmasterid )
  }

  getBoatMaster(boatmasterid: any){
    return this.http.get(this.url + 'club/getBoatMaster/' + boatmasterid )
  }

  getBoatMasterForMembers(membercode: any){
    return this.http.get(this.url + 'club/getBoatMasterForMembers/' + membercode )
  }

  getBoatType(){
    return this.http.get(this.url + 'club/getBoatType');
  }

  getAllBoatMaster(){
    return this.http.get(this.url + 'club/getAllBoatMaster')
  }

  getAllExprtBoatMaster(){
    return this.http.get(this.url + 'club/getexportBoatmaster')
  }

  getBoatDocNo(year: any){
    return this.http.get(this.url + 'club/geTBoatDocNO/' + year)
  }

  getMaxofService(){
    return this.http.get(this.url + 'club/getMaxofServiceid')
  }

  postBoatMaster( membercode: string, boattype: string, regno: string, boatcolor: string, boatenginetype: string,modelno: string, boatenggineno: string, hostpower: string,sallexpirydate: string, regexpiry: string,createdate: string,boatname: string, insurenceno: string, insurenceexpdate: string,jetskipregno: string, jetskiexpdate: string,boatno: string,linexpdate: string,boatlength: string,boatslot: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      membercode: membercode, 
      boattype: boattype,
      regno: regno,
      boatcolor: boatcolor,
      boatenginetype: boatenginetype,
      modelno: modelno, 
      boatenggineno: boatenggineno,
      hostpower: hostpower,
      sallexpirydate: sallexpirydate,
      regexpiry: regexpiry,
      createdate:createdate,
      boatname: boatname, 
      insurenceno: insurenceno,
      insurenceexpdate: insurenceexpdate,
      jetskipregno: jetskipregno,
      jetskiexpdate: jetskiexpdate,
      boatno:boatno,
      linexpdate:linexpdate,
      boatlength: boatlength,
      boatslot: boatslot
    }

    this.http.post(this.url + 'club/postBoatMaster', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  UpdateBoatDocNo(year: string, newVal: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newValue = {
      newVal: newVal,
      year: year
    }

    this.http.post(this.url + 'club/updateBoatNodoc', JSON.stringify(newValue), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateBoatMaster(membercode: string, boattype: string, regno: string, boatcolor: string, boatenginetype: string,modelno: string,  boatengineno: string, hostpower: string,sailexpdate: string, regexpiry: string,uppdatedate: string,boatname: string, insurenceno: string, insurenceexpdate: string,jetskipregno: string, jetskiexpdate: string,boatno: string,linexpdate: string,boatlength : string,boatslot: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      membercode: membercode,
      boattype: boattype,
      regno: regno,
      boatcolor: boatcolor,
      boatenginetype: boatenginetype,
      modelno: modelno, 
      boatengineno: boatengineno,
      hostpower: hostpower,
      sailexpdate: sailexpdate,
      regexpiry: regexpiry,
      uppdatedate:uppdatedate,
      boatname: boatname, 
      insurenceno: insurenceno,
      insurenceexpdate: insurenceexpdate,
      jetskipregno: jetskipregno,
      jetskiexpdate: jetskiexpdate,
      boatno:boatno,
      linexpdate:linexpdate,
      boatlength: boatlength,
      boatslot: boatslot,
      
    }

    this.http.post(this.url + 'club/updateBoatMaster', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postServiceMaster(servicename: string,servicedesc:string, actualprice: string,discountprice: string,memberprice: string,
    createddate: string, createdby: string,servicecategory: string, taxcategory: string,deptid: string,expid: string, pcode: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      servicename: servicename,
      servicedesc:servicedesc,
      actualprice: actualprice,
      discountprice: discountprice,
      memberprice: memberprice, 
      createddate: createddate,
      createdby: createdby,
      servicecategory: servicecategory,
      taxcategory: taxcategory,
      deptid:deptid,
      expid: expid, 
      pcode: pcode
    }

    this.http.post(this.url + 'club/postServiceMaster', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateserviceMaster(serivcename: string, servicedesc: string, actualprice: string, discountprice: string, memberprice: string,updatedate: string,
    updatedby: string, servicecategory: string,taxcategory: string, deptid: string,expid: string,pcode: string, serviceid: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      serivcename: serivcename,
      servicedesc: servicedesc,
      actualprice: actualprice,
      discountprice: discountprice,
      memberprice: memberprice,
      updatedate: updatedate, 
      updatedby: updatedby,
      servicecategory: servicecategory,
      taxcategory: taxcategory,
      deptid: deptid,
      expid:expid,
      pcode: pcode, 
      serviceid: serviceid,
    }

    this.http.post(this.url + 'club/updateServiceMaster', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }
}
