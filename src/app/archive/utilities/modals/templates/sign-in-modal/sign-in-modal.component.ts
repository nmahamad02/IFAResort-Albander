import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sign-in-modal',
  templateUrl: './sign-in-modal.component.html',
  styleUrls: ['./sign-in-modal.component.scss']
})
export class SignInModalComponent implements OnInit {

  modalForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<SignInModalComponent>) { }

  ngOnInit() {
    this.modalForm = new FormGroup({
      password: new FormControl(''),
      email: new FormControl(''),
      rememberMe: new FormControl(false),
    });
  }

  signIn(): void {
    this.dialogRef.close();
  }

  forgotPassword(): void {
    this.dialogRef.close();
  }
}
