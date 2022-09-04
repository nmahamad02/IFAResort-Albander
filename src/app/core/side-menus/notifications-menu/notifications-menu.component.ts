import { Component, OnInit, HostBinding } from '@angular/core';
import { SideMenusService } from '../side-menus.service';

@Component({
  selector: 'app-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss']
})
export class NotificationsMenuComponent implements OnInit {
  @HostBinding('class.actions-on-top') topActions = true;

  constructor(private sideMenusService: SideMenusService) { }

  ngOnInit() {}

  closeAltMenu(): void {
    this.sideMenusService.toggleAltMenuSubject.next('close');
  }
}
