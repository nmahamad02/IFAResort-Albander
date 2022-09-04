import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  title = 'IFAResort';
  
  loading = false;
  submitted = false;
  error = '';
  usrPwd: string = "";

  notmatched: boolean = false;

  signupForm: FormGroup;

  constructor(public router: Router,private authenticationService: AuthenticationService) {
    this.signupForm = new FormGroup({
      username: new FormControl('', [ Validators.required ]),
      password: new FormControl('', [ Validators.required ]),
      confirmPassword: new FormControl('', [ Validators.required ]),
      firstname: new FormControl('', [ Validators.required ]),
      lastname: new FormControl('', [ Validators.required ]),
      emailid: new FormControl('', [ Validators.required ]),
      contactno: new FormControl('', [ Validators.required ]),
      terms: new FormControl(false)
    });
  }

  ngOnInit() { }

  onSignup() {
    const data = this.signupForm.value;
    console.log(this.signupForm);
    this.submitted = true;
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      return;
    } else {
      this.loading = true;
      this.encrypt(data.password);
  
      console.log(data);
      console.log(this.usrPwd);

      const utc = new Date;
      const userid = this.formatDate(utc);
  
      this.authenticationService.signup(data.firstname, data.lastname, data.username, this.usrPwd, data.contactno, Number(userid)).subscribe(response => {
        console.log(response);
        this.router.navigate(['authentication/signin']);
      })
      /*this.snackBar.open(data.username + " successfully added", "close", {
        duration: 5000,
        verticalPosition: 'top',
        panelClass: ['sbBg']
      });*/
  
      this.signupForm = new FormGroup({
        username: new FormControl('', [ Validators.required ]),
        password: new FormControl('', [ Validators.required ]),
        confirmPassword: new FormControl('', [ Validators.required ]),
        firstname: new FormControl('', [ Validators.required ]),
        lastname: new FormControl('', [ Validators.required ]),
        emailid: new FormControl('', [ Validators.required ]),
        contactno: new FormControl('', [ Validators.required ]),
        terms: new FormControl(false)
      });
    }
  }

  checkPassword() {
    const data = this.signupForm.value;
    if(data.password === data.confirmPassword ) {
      this.error = "";
    } else {
      this.error = "Passwords do not match";
    }
  }

  encrypt(pwd: string) {
    this.usrPwd = "";
    var i: number;
    var ascii: number;
    for(i = 0; i < pwd.length; i++) {
      ascii = pwd[i].charCodeAt(0)+10;
      this.usrPwd += String.fromCharCode(ascii);
    }
  }

  get g() { return this.signupForm.controls; }

  formatDate(date: any) {
    var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear(), hour = d.getHours(), min = d.getMinutes();

    if (day.length < 2) {
      day = '0' + day;
    } 
    if (month.length < 2) {
      month = '0' + month;
    }
    return [day + hour + min];
  }

}
