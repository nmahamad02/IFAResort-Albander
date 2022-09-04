import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  title = 'IFAResort';
  notmatched: boolean = false;

  loading = false;
  submitted = false;
  error = '';
  usrPwd: string = "";

  signinForm: FormGroup;

  constructor(public router: Router,private authenticationService: AuthenticationService) { 
    this.signinForm = new FormGroup({
      username: new FormControl('', [ Validators.required ]),
      password: new FormControl('', [ Validators.required ])
    });
  }

  ngOnInit() {
    
  }

  onSignin() {
    const data = this.signinForm.value;
    console.log(data);
    this.submitted = true;
    // stop here if form is invalid
    if (this.signinForm.invalid) {
      return;
    } 
    else {
      this.loading = true;
      this.encrypt(data.password);
    
      this.authenticationService.checkUser(data.username).subscribe ((res: any) => {
        console.log(res.recordset[0]);
        if(this.usrPwd === res.recordset[0].PASSWORD) {
          this.error = "";
          // if signin success then:
          
          this.authenticationService.signin(res.recordset[0].FIRSTNAME, res.recordset[0].LASTNAME, res.recordset[0].USERCLASS).subscribe((res: any) => {
            this.router.navigate(['home/dashboard']);
          })
          this.signinForm = new FormGroup({
            username: new FormControl('', [ Validators.required ]),
            password: new FormControl('', [ Validators.required ])
          });
        }
        else {
          this.error = "Password is incorrect!";
        }
      },
      (err: any) => {
        this.error = "Username or Password is incorrect!";
      });
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

  get f() { return this.signinForm.controls; }  


}
