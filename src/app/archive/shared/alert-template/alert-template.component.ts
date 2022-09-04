import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-alert-template-component',
  templateUrl: 'alert-template.component.html',
  styleUrls: ['./alert-template.component.scss']
})
export class AlertTemplateComponent {
  iconType: string;
  iconPosition: string;
  title: string;
  text: string;
  options: false;
  input: false;
  button: string;
  inputData: string;

  constructor(
    public dialogRef: MatDialogRef<AlertTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.iconType = data.iconType;
    this.iconPosition = data.iconPosition ? data.iconPosition : 'default';
    this.title = data.title;
    this.text = data.text;
    this.options = data.options;
    this.input = data.input;
    this.button = data.button;

    if (data.time) {
      setTimeout(() => {
        this.dialogRef.close();
      }, data.time);
    }
  }
}
