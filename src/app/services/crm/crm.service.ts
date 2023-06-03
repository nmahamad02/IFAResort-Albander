import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CrmService {
  private url = 'http://15.185.46.105:5000/api';

  constructor(private http:HttpClient) { }

  getAllMembers(){
    return this.http.get(this.url + '/crm/getAllMembers')
  }

  getAllActiveMembers(){
    return this.http.get(this.url + '/crm/getAllActiveMembers')
  }

  getExpiringAgreements() {
    return this.http.get(this.url + '/crm/getExpiringAgreements')
  }

  getAllMembersIsPrimary(){
    return this.http.get(this.url + '/crm/getAllMembersIsPrimary')
  }

  getAllMembersFromType(type: string) {
    return this.http.get(this.url + '/crm/getAllMembersFromType/' + type)
  }

  getExprtMembers(){
    return this.http.get(this.url + '/export/exportmember')
  }

  getExportMemberIsprimary(){
    return this.http.get(this.url + '/export/getExportMemberIsprimary')
  }

  getExportAllPrimarySubMebers(membercode: any){
    return this.http.get(this.url + '/export/getExportAllPrimarySubMebers/' + membercode)
  }

  getexportBoat(membercode: any){
    return this.http.get(this.url + '/export/getexportBoat/' + membercode)
  }

  getExprtPrimaryMembers(){
    return this.http.get(this.url + '/export/exportprimarymember')
  }

  getPaymentType(){
    return this.http.get(this.url + '/crm/paymenttype/')
  }

  getAllBank(){
    return this.http.get(this.url + '/crm/bankDetails/')
  }

  searchOpbalDebitAccount(pcode: string){
    return this.http.get(this.url + '/coa/getOpbalDebitAccount/'+ pcode)
  }

  getOpbalDebitAccount(pcode: string){
    return this.http.get(this.url + '/coa/getDebitAccountBypocde/'+ pcode)
  }

  getmembersNameLike(name:string ){
    return this.http.get(this.url + '/crm/getmembersNameLike/'+ name)
  }

  getMemberFromCPR(cprNbr: string) {
    return this.http.get(this.url + '/crm/getMemberFromCPR/'+ cprNbr)
  }

  getMemberFromREF(refNbr: string) {
    return this.http.get(this.url + '/crm/getMemberFromREF/'+ refNbr)
  }

  searchMemberFromCPR(cprNbr: string) {
    return this.http.get(this.url + '/crm/searchMemberFromCPR/'+ cprNbr)
  }
  
  searchMemberFromREF(refNbr: string) {
    return this.http.get(this.url + '/crm/searchMemberFromREF/'+ refNbr)
  }

  searchTranHead(trnno: string, year: string) {
    return this.http.get(this.url + '/coa/searchTranHead/' + trnno + '/' + year)
  }

  getTranHead(trnno: string, year: string) {
    return this.http.get(this.url + '/coa/getTranHead/' + trnno + '/' + year)
  }

  getInvoiceReceipt(vcrno: string, year: string){
    return this.http.get(this.url + '/crm/getinvoicereceiprt/' + vcrno + '/' + year)
  }

  getAllExpenseforGrid(){
    return this.http.get(this.url + '/coa/getAllExpenseMaster')
  }

  getSearchOpbal(pcode: string, year: string){
    return this.http.get(this.url + '/search/opbal/pcode/' + pcode + '/' + year)
  }

  getMembers(memberno:any){
    return this.http.get(this.url + '/crm/getMembers/'+ memberno)
  }

  getBankName(bankid: any){
    return this.http.get(this.url + '/coa/getbanknamefromid/'+ bankid)
  }

  deleteTran(trnno: string,year: string) {
    return this.http.get(this.url + '/coa/deleteTran/' + trnno + '/' + year)
  }  

  getnotofExpenseMaster(expno: string) {
    return this.http.get(this.url + '/coa/getnotExpenseMaster/' + expno)
  } 

  getAllDepartmentMaster() {
    return this.http.get(this.url + '/coa/getAllDepartmentMaster')
  } 
  
  searchExpenseMaster(expno: string) {
    return this.http.get(this.url + '/coa/searchExpenseMaster/' + expno)
  } 

  searchMembers(memberno:any){
    return this.http.get(this.url + '/crm/searchMembers/'+ memberno)
  }

  getBankCode(bankname:any){
    return this.http.get(this.url + '/coa/getbANKDETAiLSbODe/'+ bankname)
  }

  getSumofMemberprice(agrementno:any){
    return this.http.get(this.url + '/crm/getSumofMemberprice/'+ agrementno)
  }

  getAgreementBLA(agrementno:any,membercode: any){
    return this.http.get(this.url + '/crm/getAgreementBLA/'+ agrementno + '/' + membercode)
  }

  deleteAgreementBLA(agrementno:any,membercode: any){
    return this.http.get(this.url + '/coa/deleteAgreementBLA/'+ agrementno + '/' + membercode)
  }

  getExpenseMaster(expid: any){
    return this.http.get(this.url + '/coa/getExpenseMaster/' + expid)
  }

  searchSoMaster(sono: any){
    return this.http.get(this.url + '/crm/searchSOMaster/' + sono)
  }

  getagreementmaster(argno: any){
    return this.http.get(this.url + '/coa/getAgreementsMaster/' + argno)
  }

  searchagreementmaster(argno: any){
    return this.http.get(this.url + '/coa/searchAgreementsMaster/' + argno)
  }

  getagreementDetails(argno: any){
    return this.http.get(this.url + '/coa/getAgreementsDetails/' + argno)
  }

  getExpenseMasterExpid(){
    return this.http.get(this.url + '/coa/getExpenseMasterExpid')
  }

  getDocForMemb(year: string) {
    return this.http.get(this.url + '/coa/getDocForMemb/' + year)
  }

  getDependentMembers(memberno:any){ 
    return this.http.get(this.url + '/crm/getDependentMembers/'+ memberno)
  }

  postRVTranHead(year: string, trnno: string, trndate: string, custcode: string, lname: string, total: string, remarks: string, cashamt: string, chequeno: string, chequebank: string,cheqdate: string, chqamt: string,credicardno: string,creditcardamt: string, createUser: string, createDate: string, editUser: string, editDate: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      year: year,
      trnno: trnno, 
      trndate: trndate,
      custcode:custcode,
      lname: lname,
      total: total,
      remarks: remarks,
      cashamt: cashamt,
      chequeno: chequeno, 
      chequebank: chequebank,
      cheqdate: cheqdate,
      chqamt: chqamt,
      credicardno: credicardno,
      creditcardamt:creditcardamt,
      createUser: createUser,
      createDate: createDate,
      editUser: editUser,
      editDate: editDate
    }

    this.http.post(this.url + '/coa/postRVTranHead', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  postsgldatatemp(year: string,trntype: string, dbcd: string, vcrno: string, vochdate: string, chqno: string, chqdate: string, bank: string, entrytype: string, accode: string, creditbal: number,amount: number, debitbal: number,remarks: string) {

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      year: year,
      trntype: trntype,
      dbcd: dbcd,
      vcrno: vcrno, 
      vochdate: vochdate,
      chqno: chqno,
      chqdate: chqdate,
      bank: bank,
      entrytype: entrytype, 
      accode: accode,
      creditbal: creditbal,
      amount: amount,
      debitbal: debitbal,
      remarks:remarks
    }

    this.http.post(this.url + '/coa/postsgldatatemp', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  deleteSGLDataTemp(year: string, trnno: string) {    
    return this.http.get(this.url + '/crm/deleteSGLDataTemp/'+ trnno + '/' + year)
  }

  postNewMember(membno: string,refmembno:string,title: string, firstName: string, surName: string, memberType: string, birthDate: string, maritalStatus: string, add1: string, add2: string, add3: string, nationality: string, telOff: string, telRes: string, faxNbr: string, employer: string, position: string, isPrimary: string, relation: string, image: string, primaryMember: string, email: string, createdDate: string, insuranceNbr: string, cprNbr: string, accode: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newMember = {
      membno:membno,
      refmembno:refmembno,
      title: title,
      firstName: firstName,
      surName: surName,
      memberType: memberType,
      birthDate: birthDate,
      maritalStatus: maritalStatus,
      add1: add1,
      add2: add2,
      add3: add3,
      nationality: nationality,
      telOff: telOff,
      telRes: telRes,
      faxNbr: faxNbr,
      employer: employer,
      position: position,
      isPrimary: isPrimary,
      relation: relation,
      image: image,
      primaryMember: primaryMember,
      email: email,
      createdDate: createdDate,
      insuranceNbr: insuranceNbr,
      cprNbr: cprNbr,
      accode: accode
    }

    return this.http.post(this.url + '/crm/postNewMember', JSON.stringify(newMember), { headers: headers })
  }


  postExpenseMaster(compcode: string, expid: string, expcode: string, expname: string, glcode: string, active: string, user: string, date: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const newMember = {
      compcode: compcode,
      expid:expid,
      expcode: expcode,
      expname: expname,
      glcode: glcode,
      active: active,
      user: user,
      date: date,
    }

    return this.http.post(this.url + '/coa/postExpenseMaster', JSON.stringify(newMember), { headers: headers })
  }

  

  UpdateExpenseMaster(expname: string, glcode: string, active: string, user: string, date: string, expcode: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const newMember = {
      expname: expname,
      glcode:glcode,
      active: active,
      user: user,
      date: date,
      expcode: expcode, 
    }

    return this.http.post(this.url + '/coa/UpdateExpenseMaster', JSON.stringify(newMember), { headers: headers })
  }

  updateMember(refmembno:string, memberNo: string, title: string, firstName: string, surName: string, memberType: string, birthDate: string, maritalStatus: string, add1: string, add2: string, add3: string, nationality: string, telOff: string, telRes: string, faxNbr: string, employer: string, position: string, isPrimary: string, relation: string, image: string, primaryMember: string, email: string, createdDate: string, insuranceNbr: string, cprNbr: string, accode: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newMember = {
      refmembno:refmembno,
      memberNo: memberNo,
      title: title,
      firstName: firstName,
      surName: surName,
      memberType: memberType,
      birthDate: birthDate,
      maritalStatus: maritalStatus,
      add1: add1,
      add2: add2,
      add3: add3,
      nationality: nationality,
      telOff: telOff,
      telRes: telRes,
      faxNbr: faxNbr,
      employer: employer,
      position: position,
      isPrimary: isPrimary,
      relation: relation,
      image: image,
      primaryMember: primaryMember,
      email: email,
      createdDate: createdDate,
      insuranceNbr: insuranceNbr,
      cprNbr: cprNbr,
      accode: accode
    }

    return this.http.post(this.url + '/crm/updateMember', JSON.stringify(newMember), { headers: headers })
  }

  updateDocForMemb(fieldvalue: string, year: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      fieldvalue : fieldvalue,
      cyear: year
    }

    this.http.post(this.url + '/coa/updateDocForMemb', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
    })
  }

  deleteMember(membNo: any) {
    return this.http.get(this.url + '/crm/deleteMember/'+ membNo)
  }

  deleteDepMembers(membNo: any) {    
    return this.http.get(this.url + '/crm/deleteDepMember/'+ membNo)
  }
  
  getCustomerAcc(fyear:any){
    return this.http.get(this.url + '/crm/getCustomerAcc/'+ fyear)
  }

  getAllOpbal(pcode:any,fyear:any){
    return this.http.get(this.url + '/crm/getAllopbal/'+ pcode + '/' + fyear)
  }
  getReference(){
    return this.http.get(this.url + '/lookup/refs')
  }

  getParty(){
    return this.http.get(this.url + '/coa/Party/')
  }

  getRVDocNo(year: string) {
    return this.http.get(this.url + '/coa/getRVDocNO/' + year)
  }

  getPartyDetails(partyid:string){
    return this.http.get(this.url + '/coa/PartyDetails/'+ partyid)
  }

  getPartyFromName(name: string){
    return this.http.get(this.url + '/coa/partyFromName/'+ name)
  }

  getReferenceCode(pcode:any){
    return this.http.get(this.url + '/crm/refs/'+ pcode)
  }

  getPcode(pcode:any,year: any){
    return this.http.get(this.url + '/crm/getPcode/'+ pcode + '/' + year)
  }

  searchpcode(pcode:any){
    return this.http.get(this.url + '/crm/getSearchPcode/'+ pcode)
  }

  getPcodeFromName(name:any,year: any){
    return this.http.get(this.url + '/crm/getPcodeFromName/'+ name + '/' + year)
  }

  searchpcodeFromName(name:any,year: any){
    return this.http.get(this.url + '/crm/getSearchPcodeFromName/'+ name + '/' + year)
  }

  postParty(  compcode:string, partyid: number, name: string, add1: string, add2: string, add3: number, phone1: string, phone2: number, mobile: string,
    email:string, fax1: string, fax2: string, refno: string, contact: string, flat: number, buildling: string, street: number, block: string,  city: string,
    pobox:string,  country: string, pcode: string,creatuser: string, creatdt: string, edituser: string,editdt: string) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newTran = {
      compcode: compcode,
      partyid: partyid, 
      name: name,
      add1: add1,
      add2: add2,
      add3: add3,
      phone1: phone1,
      phone2: phone2,
      mobile: mobile,
      email: email,
      fax1: fax1, 
      fax2: fax2,
      refno: refno,
      contact: contact,
      flat: flat,
      buildling: buildling,
      street: street,
      block: block,
      city: city,
      pobox: pobox,
      country: country, 
      pcode: pcode,
      creatuser: creatuser,
      creatdt: creatdt,
      edituser: edituser,
      editdt: editdt,
    }
    console.log(newTran)
    this.http.post(this.url + '/crm/postParty', JSON.stringify(newTran), { headers: headers }).subscribe((res: any) => {
      console.log(res);
      console.log("Party Created")
    }) 
  }

  deleteParty(partyid: any) {
    return this.http.get(this.url + '/coa/deleteParty/' + partyid)
  } 
}
