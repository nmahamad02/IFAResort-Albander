import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material';

@Component({
  selector: 'app-notification-template',
  templateUrl: './notification-template.component.html',
  styleUrls: ['./notification-template.component.scss']
})

export class NotificationTemplateComponent implements OnInit {
  @Input() message: string;
  @Input() text: string;
  @Input() icon: string;
  @Input() type = false;
  @Input() dismissible = false;

  baseClass = 'notification alert';
  classes = '';

  /** The instance of the component making up the content of the snack bar. */
  snackBarRef: MatSnackBarRef<NotificationTemplateComponent>;

  constructor(@Optional() @Inject(MAT_SNACK_BAR_DATA) public data: any) {
    if (data) {
      this.message = data.message;
      this.icon = data.icon;
      this.type = data.type;
      this.dismissible = data.dismissible;
    }
  }

  /** Dismisses the snack bar. */
  dismiss(): void {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  ngOnInit(): void {
    this.classes = this.baseClass;
    this.classes += (this.dismissible ? ' alert-dismissible' :  '');
    this.classes += (this.type ? ' alert-' + this.type :  '');
  }

}
