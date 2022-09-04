import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateAccountModalComponent } from './templates/create-account-modal/create-account-modal.component';
import { SignInModalComponent } from './templates/sign-in-modal/sign-in-modal.component';

@Component({
  selector: 'app-modals',
  templateUrl: './modals.component.html',
  styleUrls: ['./modals.component.scss']
})
export class ModalsComponent {

  constructor(public dialog: MatDialog) { }

  openRegisterModal(): void {
    const dialogRef = this.dialog.open(CreateAccountModalComponent, {
      panelClass: 'register-modal'
      // To pass data through the modal:
      // data: {name: this.name, email: this.email}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // To get the output data from the modal:
      // var output = result;
    });
  }

  openSignInModal(): void {
    const dialogRef = this.dialog.open(SignInModalComponent, {
      panelClass: 'sign-in-modal'
      // To pass data through the modal:
      // data: {name: this.name, email: this.email}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
        // To get the output data from the modal:
      // var output = result;
    });
  }
}
