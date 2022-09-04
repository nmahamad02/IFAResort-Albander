import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, } from 'rxjs';
import { LoggedUserModel } from './logged-user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class AuthenticationService {
  private url = 'http://15.185.46.105:5000/api/user';

  loggedUserSubject: BehaviorSubject<LoggedUserModel>;
  loggedUser: LoggedUserModel;

  constructor(private http: HttpClient) {
    //this.setUser(); // for the purpose of this example we initialize it with a default logged user
    this.loggedUserSubject = new BehaviorSubject(this.loggedUser);
  }

  isAuthenticated() {
    return this.loggedUserSubject.asObservable();
  }

  // tslint:disable-next-line:max-line-length
  setUser(firstname: string, lastname: string, userclass: string) {
    // this sets a default user for the template
    this.loggedUser = new LoggedUserModel();
    this.loggedUser.firstname = firstname;
    this.loggedUser.lastname = lastname;
    //this.loggedUser.image = image;
    this.loggedUser.userclass = userclass;
    localStorage.setItem('firstname', JSON.stringify(firstname));
    localStorage.setItem('lastname', JSON.stringify(lastname));
    localStorage.setItem('userclass', JSON.stringify(userclass));
  }

  checkUser(username: string): Observable<any> {
    // your log in logic should go here
    return this.http.get(this.url + '/' + username)
  }

  getUserRole(userclass: string) {
    return this.http.get(this.url + '/roles/' + userclass)
  }

  signin(firstname: string, lastname: string, userclass: string): Observable<any> {
    this.setUser(firstname, lastname, userclass);
    // your log in logic should go here
    this.loggedUserSubject.next(this.loggedUser);
    return of(true);
  }

  signup(fName: string, lName: string, usrCode: string, pwd: string, cntctNbr: string, userid: number) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    const newUsr = {
      usercode: usrCode,
      password: pwd,
      firstname: fName,
      lastname: lName,
      contactno: cntctNbr,
      userid: userid
    }

    return this.http.post(this.url + 's/new', JSON.stringify(newUsr), { headers: headers })
  }

  logout(): Observable<any> {
    this.loggedUser = null;
    localStorage.setItem('firstname', "");
    localStorage.setItem('lastname', "");
    localStorage.setItem('userclass', "");
    // your log out logic should go here
    this.loggedUserSubject.next(null);
    return of(true);
  }

  recoverPassword(usrCode: string, pwd: String) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    
    const newUsr = {
      usercode: usrCode,
      password: pwd
    }

    return this.http.post(this.url + '/changePassword', JSON.stringify(newUsr), { headers: headers })
  }

}
