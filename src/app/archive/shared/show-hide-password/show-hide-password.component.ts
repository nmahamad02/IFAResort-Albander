import { Component, ContentChild, ElementRef } from '@angular/core';
import { ShowHideInputDirective } from './show-hide-input.directive';

@Component({
  selector: 'app-show-hide-password',
  templateUrl: './show-hide-password.component.html',
  styleUrls: ['./show-hide-password.component.scss']
})
export class ShowHidePasswordComponent {

  show = false;
  @ContentChild(ShowHideInputDirective, { read: ElementRef, static: false }) input: ElementRef;

  constructor() {}

  toggleShow() {
    this.show = !this.show;
    if (this.show) {
      this.input.nativeElement.type = 'text';
    } else {
      this.input.nativeElement.type = 'password';
    }
  }

}
