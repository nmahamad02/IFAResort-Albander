import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertTemplateComponent } from '../../shared/alert-template/alert-template.component';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  constructor(public dialog: MatDialog) {}

  // You can pass the following options to the alert component:
  // {
  //   iconPosition: 'overflow' | 'default' // icon position
  //   iconType: 'success' | 'error', // icon shape and color
  //   title: "Here's a message!", // Title of the modal
  //   text: 'The content, // Text of the modal
  //   options: false, // True will display yes or no buttons
  //   input: false, // True will show a text input
  //   button: 'Good', // Text of the modal button
  //   time: undefined // Time you want the modal to live (ms)
  // }

  basicAlert(): void {
    const dialogRef = this.dialog.open(AlertTemplateComponent, {
      data: {
        title: 'Thanks for sharing!',
        button: 'Download'
      },
      autoFocus: false
    });
  }

  textAlert(): void {
    const dialogRef = this.dialog.open(AlertTemplateComponent, {
      data: {
        title: 'Meet up with Alba',
        text: 'Today, 5:30 PM',
        button: 'Yasss!'
      },
      autoFocus: false
    });
  }

  iconAlert(): void {
    const dialogRef = this.dialog.open(AlertTemplateComponent, {
      data: {
        iconType: 'success',
        title: 'Good job!',
        text: 'You are the winner',
        button: 'Play again'
      },
      autoFocus: false
    });
  }

  overflowIconSuccessAlert(): void {
    const dialogRef = this.dialog.open(AlertTemplateComponent, {
      data: {
        iconType: 'success',
        iconPosition: 'overflow',
        title: 'Good job!',
        text: 'You are the winner',
        button: 'Claim prize'
      },
      autoFocus: false,
      panelClass: ['overflow-icon-alert-wrapper']
    });
  }

  overflowIconErrorAlert(): void {
    const dialogRef = this.dialog.open(AlertTemplateComponent, {
      data: {
        iconType: 'error',
        iconPosition: 'overflow',
        title: 'Session expired',
        text: 'Due to inactivity, your session was closed.',
        button: 'Log in'
      },
      autoFocus: false,
      panelClass: ['overflow-icon-alert-wrapper']
    });
  }

  optionsAlert(): void {
    const dialogRef = this.dialog.open(AlertTemplateComponent, {
      data: {
        iconType: 'success',
        title: 'Do you want to submit your exam?',
        text: 'Think it twice',
        options: true
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialog.open(AlertTemplateComponent, {
          data: {
            iconType: 'success',
            title: 'Congrats!',
            text: 'Your exam has been submitted successfully.',
            button: 'Ok'
          },
          autoFocus: false
        });
      }
    });
  }

  canceledAlert(): void {
    const dialogRef = this.dialog.open(AlertTemplateComponent, {
      data: {
        iconType: 'error',
        title: 'Do you want to delete your file?',
        text: 'You will not be able to recover it',
        options: true
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dialog.open(AlertTemplateComponent, {
          data: {
            iconType: 'success',
            title: 'Deleted',
            text: 'Your file has been deleted.',
            button: 'Ok'
          },
          autoFocus: false
        });
      } else {
        this.dialog.open(AlertTemplateComponent, {
          data: {
            iconType: 'error',
            title: 'Canceled',
            text: 'Your file is safe. You can find it in your inbox.',
            button: 'Ok'
          },
          autoFocus: false
        });
      }
    });
  }

  inputAlert(): void {
    const dialogRef = this.dialog.open(AlertTemplateComponent, {
      data: {
        title: 'Please enter your name',
        input: true
      },
      autoFocus: false
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== false) {
        this.dialog.open(AlertTemplateComponent, {
          data: {
            title: 'Your name is',
            text: result,
            button: 'Ok'
          },
          autoFocus: false
        });
      }
    });
  }

  timedAlert(): void {
    const dialogRef = this.dialog.open(AlertTemplateComponent, {
      data: {
        title: 'Auto close alert!',
        text: 'I will close in 2 seconds. Bye bye!',
        time: 2000
      },
      autoFocus: false
    });
  }
}
