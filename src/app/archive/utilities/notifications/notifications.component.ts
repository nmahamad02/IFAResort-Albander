import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificationTemplateComponent } from '../../shared/notification-template/notification-template.component';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {
  mySnackBarRef: any;

  constructor(public snackBar: MatSnackBar) { }

  showNotification(vpos, hpos, type, icon = ''): void {
    // for more info about Angular Material snackBar check: https://material.angular.io/components/snack-bar/overview
    this.mySnackBarRef = this.snackBar.openFromComponent(NotificationTemplateComponent, {
       data: {
         message: 'This is a notification positioned in the ' + vpos + ' ' + hpos,
         icon,
         type,
         dismissible: true
         // you can add everything you want here
       },
       duration: 3000,
       horizontalPosition: hpos, // 'start' | 'center' | 'end' | 'left' | 'right'
       verticalPosition: vpos, // 'top' | 'bottom'
       panelClass: ['notification-wrapper']
    });
    // this is to be able to close it from the NotificationComponent
    this.mySnackBarRef.instance.snackBarRef = this.mySnackBarRef;
  }
}
