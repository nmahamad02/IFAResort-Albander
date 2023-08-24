import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  private url = 'http://15.185.46.105:5000/api';
 
  constructor(private http: HttpClient) { }
  
  getTrailBalance(year: string) { 
    return this.http.get(this.url + '/reports/financials/trialbalance/' + year)
  }

  getCustomerForExcel() { 
    return this.http.get(this.url + '/coa/getCustomerForExcel')
  }

  getPartyForExcel() { 
    return this.http.get(this.url + '/coa/getPartyForExcel')
  }
  
  getCoa(year: string) {
    return this.http.get(this.url + '/coa/getcoa/' + year)
  }

  getMainGrp(year: string) {
    return this.http.get(this.url + '/coa/getmaingrp/' + year)
  }

  deleteDepartmentExpense(deptid: string) {
    return this.http.get(this.url + '/coa/deleteDepartmentExpense/' + deptid)
  }
  
  getSubGrp(maingrpcode:string, year: string) {
    return this.http.get(this.url + '/coa/getsubgrp/' + maingrpcode + '/' + year)
  }

  getGL(subgroupcode: string, year: string) {
    return this.http.get(this.url + '/coa/getgl/' + subgroupcode + '/' + year)
  }

  getPcode(glcode: string, year: string) {
    return this.http.get(this.url + '/coa/getpcode/' + glcode + '/' + year)
  }

  getAccountCode(pcode: string, fyear: string) { 
    return this.http.get(this.url + '/coa/getAcc/' + pcode + '/' + fyear)
  }

  getAllDepartmentExpensesforDP(fyear: string) { 
    return this.http.get(this.url + '/coa/getAllDepartmentExpensesforDP/' + fyear)
  }

  getCustomerList(fyear: string) { 
    return this.http.get(this.url + '/coa/getCustomerAcc/' + fyear)
  }

  getDepartmentMaster(prefix: string) { 
    return this.http.get(this.url + '/coa/getDepartmentMaster/' + prefix)
  }

  getCustomerBypcode(pcode: string) { 
    return this.http.get(this.url + '/coa/getDebitAccountBypocde/' + pcode)
  }

  getDepartmentforGrid(fyear:string, compocde:string, deptid: string) { 
    return this.http.get(this.url + '/coa/getDepartmentsGrid/' + fyear + '/' + compocde + '/' + deptid)
  }

  searchDepartmentMaster(prefix: string) { 
    return this.http.get(this.url + '/coa/searchDepartmentMaster/' + prefix )
  }

  getAreaName(name: string) { 
    return this.http.get(this.url + '/coa/getAreaName/' + name )
  }

  getPartyByName(areaname: string) { 
    return this.http.get(this.url + '/coa/getPartyByName/' + areaname )
  }

  getDepartmentMasterExpid() { 
    return this.http.get(this.url + '/coa/getDepartmentMasterExpid' )
  }

  getSupplierList(fyear: string) { 
    return this.http.get(this.url + '/coa/getSupplierAcc/' + fyear)
  }

  getnotofDepartmentMaster(prefix: string) {
    return this.http.get(this.url + '/coa/getnotofDepartmentMaster/' + prefix)
  } 
  
  getCustomerParty(pcode:string, fyear: string){
    return this.http.get(this.url + '/coa/getPartyCustomer/' + pcode + '/' + fyear)
  }
  getAllParty() {
    return this.http.get(this.url + '/ar/getAllParty')
  }

  getCustomerInvoices(pcode:string, sfyear:string, efyear:string){
    return this.http.get(this.url + '/coa/getCustomerOpening/' + pcode +'/' + sfyear + '/' + efyear)
  }

  getAccountsCategory() {
    return this.http.get(this.url + '/coa/getAccountsCategory')
  }

  getAccountsType() {
    return this.http.get(this.url + '/coa/getAccountsType')
  }

  getProducts(year:string ) {
    return this.http.get(this.url + '/productList/' + year )
  }

  getBranch() {
    return this.http.get(this.url + '/coa/getBranch')
  }

  getLastSiv(year: string) {
    return this.http.get(this.url + '/coa/getsivnodoc/' + year )
  }

  getCustomerMemner(pcode:string, fyear:string) {
    return this.http.get(this.url + '/coa/getCustomerMember/'+ pcode + '/' + fyear)
  }

  getAllAgreements() {
    return this.http.get(this.url + '/coa/getAgreement')
  }

  getAllSalesOrders() {
    return this.http.get(this.url + '/coa/getAllSalesOrder')
  }

  getAllinvoices() {
    return this.http.get(this.url + '/coa/getAllinvoices')
  }

  getSalesOrderMaster(sono: any) {
    return this.http.get(this.url + '/coa/getSalesOrderMaster/' + sono)
  }

  searchSalesOrderMaster(sono: any) {
    return this.http.get(this.url + '/coa/searchSalesOrderMaster/' + sono)
  }

  getSalesOrderDetails(sono: any) {
    return this.http.get(this.url + '/coa/getSalesOrderDetails/' + sono)
  }

  getMaxTax() {
    return this.http.get(this.url + '/coa/getMaxTax')
  }

  getServiceDetails(serviceid:string) {
    return this.http.get(this.url + '/coa/getServicesDetails/'+ serviceid)
  }  

  getDocForArg(year: string) {
    return this.http.get(this.url + '/coa/getDocForArg/' + year)
  }

  getDocForSO(year: string) {
    return this.http.get(this.url + '/coa/getDocForSO/' + year)
  }

  getDocForInv(year: string) {
    return this.http.get(this.url + '/coa/getDocForInv/' + year)
  }

  getDocForRvc(year: string) {
    return this.http.get(this.url + '/coa/getRVDocNO/' + year)
  }

  checkAgreement(agrno: string) {
    return this.http.get(this.url + '/coa/checkAgreement/'+ agrno)
  }

  searchServicesDetails(serviceid:string) {
    return this.http.get(this.url + '/coa/searchServicesDetails/'+ serviceid)
  }

  deleteService(serviceid:string) {
    return this.http.get(this.url + '/coa/deleteService/'+ serviceid)
  }

  postService(serviceid: string, servicename: string, actualprice: string, createdate: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newService = {
      serviceid: serviceid,
      servicecode: 'F',
      servicetype: 'A',
      servicename: servicename,
      servicedesc: servicename,
      actualprice: actualprice,
      discount: actualprice,
      memberfee: actualprice,
      createdate: createdate,
      updateddate: createdate,
      servicecategory: '0', 
      ttaxcategoryrnno: '0',
      servicegroup: 'MISC',
      receipt: '0',
      orderno: '0',
      isboat: 0
    }

    this.http.post(this.url + '/coa/postService', JSON.stringify(newService), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

 getAllService() {
    return this.http.get(this.url + '/coa/getAllService')
  }

  getMaxOfRef() {
    return this.http.get(this.url + '/coa/getMaxRefID')
  } 

  getAllTaxCategory() {
    return this.http.get(this.url + '/coa/getTaxCategory')
  }

  getAllTaxCategoryData() {
    return this.http.get(this.url + '/coa/getTaxcategoryData')
  }

  getAggrementDetails(pcode:string) {
    return this.http.get(this.url + '/coa/getAgreementsDetails/'+ pcode)
  }

  getTaxCategorybytaxcode(taxcode:string) {
    return this.http.get(this.url + '/coa/getTaxCategorybytaxcode/'+ taxcode)
  }
  
  setNewSiv(newSivVal: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newSiv = {
      newVal: newSivVal,
      year: year
    }

    this.http.post(this.url + '/coa/updateSivDocNo', JSON.stringify(newSiv), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateNewDocRvNo(newVal: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      newVal: newVal,
      year: year, 
    }

    return this.http.post(this.url + '/coa/updateNewRVDocNO', JSON.stringify(newTran), { headers: headers })
  }

  postAddeptarmentmaster(compcode: string, deptid: string, prefix: string, deptname: string, lastno: string, active: string, expensetype: string, user: string, date: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      compcode: compcode,
      deptid: deptid, 
      prefix: prefix,
      deptname:deptname,
      lastno: lastno,
      active: active,
      expensetype: expensetype,
      user: user,
      date: date
    }

    this.http.post(this.url + '/coa/postAddeptarmentmaster', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postAggrementBLA(pcode: string, agreementno: string, serviceno: string, memberprice: string, compcode: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode: pcode,
      agreementno:agreementno,
      serviceno: serviceno,
      memberprice: memberprice,
      compcode: compcode
    }

    return this.http.post(this.url + '/coa/postAgreementBLA', JSON.stringify(newTran), { headers: headers })
  }

  postAgreementMaster(compcode: string, agrno: string, agrdate: string, sono:string, quotno: string, partyid: string, pcode: string, custname: string, total: string, discount: string, gtotal: string, vatamt: string, custadd1: string, custadd2: string, custadd3: string, custphone: string,subject: string, startdate: string, enddate: string, remarks: string, status: string, createdate: string, createuser: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      compcode : compcode,
      agrno : agrno,
      agrdate : agrdate,
      sono: sono,
      partyid : partyid,
      pcode : pcode,
      quotno: quotno,
      custname : custname,
      total : total,
      discount : discount,
      gtotal : gtotal,
      vatamt : vatamt,
      custadd1 : custadd1,
      custadd2 : custadd2,
      custadd3 : custadd3,
      custphone : custphone,
      subject: subject,
      startdate: startdate,
      enddate: enddate,
      remarks : remarks,
      status: status,
      createdate : createdate,
      createuser : createuser
    }

    return this.http.post(this.url + '/coa/postagreementmaster', JSON.stringify(newTran), { headers: headers })
  }

  updateAgreementMaster(quotno: string, argdate: string, partyid:string, pcode: string, custname: string, add1: string, add2: string,add3: string, phone: string, subject: string, startdate: string, enddate: string, remarks: string, status: string,editdt: string, edituser: string, agrno: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      quotno : quotno,
      argdate : argdate,
      partyid: partyid,
      pcode : pcode,
      custname : custname,
      add1 : add1,
      add2 : add2,
      add3 : add3,
      phone : phone,
      subject: subject,
      startdate: startdate,
      enddate: enddate,
      remarks : remarks,
      status: status,
      editdt : editdt,
      edituser : edituser,
      agrno : agrno
    }

    return this.http.post(this.url + '/coa/updateagreementmaster', JSON.stringify(newTran), { headers: headers })
  }

  setSalesOrder(agrno: string, sono:string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      agrno : agrno,
      sono: sono,
    }

    return this.http.post(this.url + '/coa/setSalesOrder', JSON.stringify(newTran), { headers: headers })
  }

  
  setInvoice(agrno: string, sono:string, invno:string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      agrno : agrno,
      invno: invno,
      sono: sono,
    }

    return this.http.post(this.url + '/coa/setInvoice', JSON.stringify(newTran), { headers: headers })
  }

  updateAgreementDetails(itcode: string, desc: string, membercode: string, membername: string, frmdate:string, todate: string, value: string, price: string, disper: string, disamt: string, vatcategory: string,vat: string, amount: string, editdt: string,edituser: string, agrno: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      itcode : itcode,
      desc : desc,
      membercode : membercode,
      membername : membername,
      frmdate: frmdate,
      todate : todate,
      value : value,
      price : price,
      disper : disper,
      disamt : disamt,
      vatcategory : vatcategory,
      vat : vat,
      amount : amount,
      editdt : editdt,
      edituser : edituser,
      agrno : agrno
    }
    return this.http.post(this.url + '/coa/updateagreementdetails', JSON.stringify(newTran), { headers: headers })
  }

  
  deleteAgreement(agrNo: any) {
    return this.http.get(this.url + '/coa/deleteAgreement/'+ agrNo)
  }

  deleteAgreementDetails(agrNo: any) {    
    return this.http.get(this.url + '/coa/deleteAgreementDetails/'+ agrNo)
  }

  updatedocAgreement(fieldvalue: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      fieldvalue : fieldvalue,
      cyear: year
    }

    return this.http.post(this.url + '/coa/updatedocagreement', JSON.stringify(newTran), { headers: headers })
  }

  updatedocso(fieldvalue: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      fieldvalue : fieldvalue,
      cyear: year
    }

    return this.http.post(this.url + '/coa/updatedocso', JSON.stringify(newTran), { headers: headers })
  }

  updateDocForInv(fieldvalue: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      fieldvalue : fieldvalue,
      cyear: year
    }

    return this.http.post(this.url + '/coa/updateDocForInv', JSON.stringify(newTran), { headers: headers })
  }

  postSalesOrderMaster(quotno: string, sodate: string, sono:string, partyid: string, pcode: string, custname: string, total: string, discount: string, gtotal: string, vatamt: string, custadd1: string, custadd2: string, custphone: string,remarks: string, createdate: string, createuser: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      quotno : quotno,
      sodate : sodate,
      sono: sono,
      partyid : partyid,
      pcode : pcode,
      custname : custname,
      total : total,
      discount : discount,
      gtotal : gtotal,
      vatamt : vatamt,
      custadd1 : custadd1,
      custadd2 : custadd2,
      custphone : custphone,
      remarks : remarks,
      createdate : createdate,
      createuser : createuser
    }

    return this.http.post(this.url + '/coa/postSOmaster', JSON.stringify(newTran), { headers: headers })
  }

  updateSOMaster(quotno: string, sodate: string, sono:string, partyid: string, pcode: string, custname: string, total: string, discount: string, gtotal: string, vatamt: string, custadd1: string, custadd2: string, custphone: string,remarks: string, editdt: string, edituser: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      quotno : quotno,
      sodate : sodate,
      sono: sono,
      partyid : partyid,
      pcode : pcode,
      custname : custname,
      total : total,
      discount : discount,
      gtotal : gtotal,
      vatamt : vatamt,
      custadd1 : custadd1,
      custadd2 : custadd2,
      custphone : custphone,
      remarks : remarks,
      editdt : editdt,
      edituser : edituser,
    }

    return this.http.post(this.url + '/coa/updatesomaster', JSON.stringify(newTran), { headers: headers })
  }
  
  postSalesOrderDetails(sono: string, itcode: string, desc: string, value: string, price: string,disper: string, disamt: string, vatcategory: string,vat: string,amount: string, createdate: string, createuser: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      sono : sono,
      itcode : itcode,
      desc : desc,
      value : value,
      price : price,
      disper : disper,
      disamt : disamt,
      vatcategory : vatcategory,
      vat : vat,
      amount : amount,
      createdate : createdate,
      createuser : createuser,
    }

    return this.http.post(this.url + '/coa/postSODetails', JSON.stringify(newTran), { headers: headers })
  }

  postAgreementDetails(argno: string, compcode: string, itcode: string, desc: string, membercode: string, memmbername: string, value: string, price: string,disper: string, disamt: string, vatcategory: string,vat: string,amount: string, createdate: string, createuser: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      argno : argno,
      compcode : compcode,
      itcode : itcode,
      desc : desc,
      membercode : membercode,
      memmbername : memmbername,
      value : value,
      price : price,
      disper : disper,
      disamt : disamt,
      vatcategory : vatcategory,
      vat : vat,
      amount : amount,
      createdate : createdate,
      createuser : createuser,
    }

    return this.http.post(this.url + '/coa/postagreementdetails', JSON.stringify(newTran), { headers: headers })
  }
  
  deleteSalesOrder(sono: any) {
    return this.http.get(this.url + '/coa/deleteSalesOrder/'+ sono)
  }

  deleteSalesOrderDetails(sono: any) {    
    return this.http.get(this.url + '/coa/deleteSalesOrderDetails/'+ sono)
  }

  postOpbalDetails(pcode: string, custname: string, accountcategory: string, acounttype: string,cprno: string, tax1no: string,status: string,fyear: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode : pcode,
      custname : custname,
      accountcategory : accountcategory,
      acounttype : acounttype,
      cprno : cprno,
      tax1no : tax1no,
      status : status,
      fyear: fyear
    }

    this.http.post(this.url + '/coa/postOPBAL', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
      console.log("customer inserted")

    })
  }

  updateOPbalDeatils(custname: string, accountcategory: string,status: string,accountype: string,cpr: string, tax1no: string,pcode: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      pcode : pcode,
      custname : custname,
      accountcategory : accountcategory,
      status : status,
      accountype : accountype,
      cpr : cpr,
      tax1no : tax1no
    }

    this.http.post(this.url + '/coa/updateOPBAL', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
      console.log("customer updated")
    })
  }
  
  posttax(compcode: string,taxid: string,taxcategorycd: string, taxcategoryname: string, desc: string, taxgroup: string,tax1prec: string, taxglac: string,sequance: string, active: string, createuser: string, creatdt: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      compcode : compcode,
      taxid : taxid,
      taxcategorycd : taxcategorycd,
      taxcategoryname : taxcategoryname,
      desc : desc,
      taxgroup : taxgroup,
      tax1prec : tax1prec,
      taxglac : taxglac,
      sequance : sequance,
      active : active,
      createuser : createuser,
      creatdt : creatdt
    }

    this.http.post(this.url + '/coa/postTaxCategory', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updatetax(taxname: string, desc: string, taxgroup: string, tax1prc: string, invtax: string,seq: string, active: string, edituser: string, editdt: string,taxid: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      taxname : taxname,
      desc : desc,
      taxgroup : taxgroup,
      tax1prc : tax1prc,
      invtax : invtax,
      seq : seq,
      active : active,
      edituser : edituser,
      editdt : editdt,
      taxid: taxid
    }

    this.http.post(this.url + '/coa/updateTaxCategory', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postDeptExpenseMaster(compcode: string, deptid: string, expid: string, glcode: string, user: string, date: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      compcode: compcode,
      deptid: deptid, 
      expid: expid,
      glcode:glcode,
      user: user,
      date: date
    }

    this.http.post(this.url + '/coa/postDeptExpenseMaster', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postReferenceData(recid: string, pcode: string, refname: string, refdesc: string, reftype: string, compcode: string,active: string, createuser: string, createdate: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      recid: recid,
      pcode: pcode, 
      refname: refname,
      refdesc:refdesc,
      reftype: reftype,
      compcode: compcode,
      active:active,
      createuser: createuser,
      createdate: createdate
    }

    this.http.post(this.url + '/coa/postRefData', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  updateReferenceData(name: string, desc: string, type: string, compcode: string, active: string, createuser: string,createdate: string, pcode: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      name: name,
      desc: desc, 
      type: type,
      compcode:compcode,
      active: active,
      createuser: createuser,
      createdate:createdate,
      pcode: pcode
    }

    this.http.post(this.url + '/coa/updateRefData', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  UpdateAddeptarmentmaster(deptname: string, lastno: string, active: string, type: string, edituser: string, date: string,prefix: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      deptname: deptname,
      lastno: lastno, 
      active: active,
      type:type,
      edituser: edituser,
      date: date,
      prefix:prefix
    }

    this.http.post(this.url + '/coa/UpdateAddeptarmentmaster', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  UpdateAddeptarmentExpenseMaster(expid: string, glcode: string, edituser: string, date: string,deptid: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      expid: expid,
      glcode: glcode, 
      edituser: edituser,
      date:date,
      deptid: deptid
    }
    this.http.post(this.url + '/coa/UpdateAddeptarmentExpenseMaster', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  getAllSales() {
    return this.http.get(this.url + '/coa/getAllSales')
  }

  getSales(invno:string) {
    return this.http.get(this.url + '/coa/getSales/'+ invno)
  }

  getSalesFromSono(sono:string) {
    return this.http.get(this.url + '/coa/getSalesFromSono/'+ sono)
  }

  getAllReceipts() {
    return this.http.get(this.url + '/coa/getAllReceipts')
  }

  getReceipt(recno:string) {
    return this.http.get(this.url + '/coa/getReceipt/'+ recno)
  }  
  
  searchReceipts(recno:string) {
    return this.http.get(this.url + '/coa/searchReceipts/'+ recno)
  }  

  getReceiptFromCustCode(custcode:string) {
    return this.http.get(this.url + '/coa/getReceiptFromCustCode/'+ custcode)
  }  

  getUnallocatedInvoice(custcode:string) {
    return this.http.get(this.url + '/coa/getUnallocatedInvoice/'+ custcode)
  }  

  getPartiallyAllocatedInvoice(custcode: string, recno:string) {
    return this.http.get(this.url + '/coa/getPartiallyAllocatedInvoice/'+ custcode + '/' + recno)
  }  

  getSalesFromPcode(pCode:string) {
    return this.http.get(this.url + '/coa/getSalesFromPcode/'+ pCode)
  }

  searchSales(invno:string) {
    return this.http.get(this.url + '/coa/searchSales/'+ invno)
  }

  postSales(year: string, invno: string, invdate: string, partyId: string, custCode: string, custName: string, gtotal: string, discount: string, vatAmt: string, amount: string, sono: string, subject: string, remarks: string, createuser: string, createdate: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

      const newTran = {
        year: year,
        invno: invno, 
        invdate: invdate,
        partyId:partyId,
        custCode: custCode,
        custName: custName,
        gtotal: gtotal,
        discount: discount,
        vatAmt: vatAmt,
        amount: amount,
        sono: sono,
        subject: subject,
        remarks: remarks,
        createuser: createuser,
        createdate: createdate
      }
    return this.http.post(this.url + '/coa/postSales', JSON.stringify(newTran), { headers: headers })
  }

  updateSales(year: string, invno: string, invdate: string, partyId: string, custCode: string, custName: string, gtotal: string, discount: string, vatAmt: string, amount: string, sono: string, subject: string, remarks: string, edituser: string, editdate: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

      const newTran = {
        year: year,
        invno: invno, 
        invdate: invdate,
        partyId:partyId,
        custCode: custCode,
        custName: custName,
        gtotal: gtotal,
        discount: discount,
        vatAmt: vatAmt,
        amount: amount,
        sono: sono,
        subject: subject,
        remarks: remarks,
        edituser: edituser,
        editdate: editdate
      }
      return this.http.post(this.url + '/coa/updateSales', JSON.stringify(newTran), { headers: headers })
  }

  postOutstanding(year: string, invno: string, invdate: string, custCode: string, dbcd: string, refno: string, refdate: string, amount: string, refamount: string, subject: string, remarks: string, paymenttype: string, bank: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

      const newTran = {
        year: year,
        invno: invno, 
        invdate: invdate,
        custCode: custCode,
        dbcd: dbcd,
        refno : refno,
        refdate: refdate,
        refamount: refamount,
        subject: subject,
        remarks: remarks,
        paymenttype: paymenttype,
        bank: bank,
        amount: amount
      }
      return this.http.post(this.url + '/coa/postOutstanding', JSON.stringify(newTran), { headers: headers })
  }

  updateOutstanding(year: string, invno: string, invdate: string, custCode: string, dbcd: string, refno: string, refdate: string, amount: string, refamount: string,  subject: string, remarks: string, paymenttype: string, bank: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

      const newTran = {
        year: year,
        invno: invno, 
        invdate: invdate,
        custCode: custCode,
        dbcd: dbcd,
        refno : refno,
        refdate: refdate,
        refamount: refamount,
        subject: subject,
        remarks: remarks,
        paymenttype:paymenttype,
        bank: bank,
        amount: amount
      }
      return this.http.post(this.url + '/coa/updateOutstanding', JSON.stringify(newTran), { headers: headers })
  }

  setAllocationReceipt(invno: string, refno: string, refdate: string, refamount: string,  subject: string, remarks: string, paymenttype: string, bank: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

      const newTran = {
        invno: invno,
        refno : refno,
        refdate: refdate,
        refamount: refamount,
        subject: subject,
        remarks: remarks,
        paymenttype: paymenttype,
        bank: bank,
      }
      return this.http.post(this.url + '/coa/setAllocationReceipt', JSON.stringify(newTran), { headers: headers })
  }

  
  resetAllocationReceipt(invno: string, refno: string, recno: string, refdate: string, refamount: string,  subject: string, remarks: string, paymenttype: string, bank: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

      const newTran = {
        invno: invno,
        refno : refno,
        recno: recno,
        refdate: refdate,
        refamount: refamount,
        subject: subject,
        remarks: remarks,
        paymenttype: paymenttype,
        bank: bank,
      }
      return this.http.post(this.url + '/coa/resetAllocationReceipt', JSON.stringify(newTran), { headers: headers })
  }

  getAllocatedReceipt(invno: string, refno:string) {
    return this.http.get(this.url + '/coa/getAllocatedReceipt/'+ invno + '/' + refno)
  }  

  deleteFromOutstanding(refno:string) {
    return this.http.get(this.url + '/coa/deleteFromOutstanding/'+ refno)
  }

  deleteAllocatedReceipt(invno: string, refno:string) {
    return this.http.get(this.url + '/coa/deleteAllocatedReceipt/'+ invno + '/' + refno)
  }  

}
