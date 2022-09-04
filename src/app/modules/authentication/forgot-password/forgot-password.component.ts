import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  title = 'IFAResort';
  
  loading = false;
  submitted = false;
  error = '';
  usrPwd: string = "";

  notmatched: boolean = false;
  recoverPasswordForm: FormGroup;

  constructor(public router: Router, private authenticationService: AuthenticationService) { 
    this.recoverPasswordForm = new FormGroup({
      username: new FormControl('', [ Validators.required ]),
      password: new FormControl('', [ Validators.required ]),
      confirmPassword: new FormControl('', [ Validators.required ]),
    });
  }

  ngOnInit() {
    
  }

  checkPassword() {
    const data = this.recoverPasswordForm.value;
    if(data.password === data.confirmPassword ) {
      this.error = "";
    } else {
      this.error = "Passwords do not match";
    }
  }

  onChangePassword(){
    const data = this.recoverPasswordForm.value;
    this.encrypt(data.password);
    this.authenticationService.recoverPassword(data.username, this.usrPwd).subscribe((res: any) => {
      this.router.navigate(['home/dashboard']);
    });
  }

  get h() { return this.recoverPasswordForm.controls; }

  encrypt(pwd: string) {
    this.usrPwd = "";
    var i: number;
    var ascii: number;
    for(i = 0; i < pwd.length; i++) {
      ascii = pwd[i].charCodeAt(0)+10;
      this.usrPwd += String.fromCharCode(ascii);
    }
  }
}
