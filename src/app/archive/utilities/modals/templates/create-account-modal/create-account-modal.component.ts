import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-create-account-modal',
  templateUrl: './create-account-modal.component.html',
  styleUrls: ['./create-account-modal.component.scss']
})
export class CreateAccountModalComponent implements OnInit {

  modalForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateAccountModalComponent>) { }

  ngOnInit() {
    this.modalForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
      email: new FormControl(''),
      newsletter: new FormControl(false),
    });
  }

  createAccount(): void {
    this.dialogRef.close();
  }
}
