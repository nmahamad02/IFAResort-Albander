import { Component, OnInit, HostBinding } from '@angular/core';
import { SideMenusService } from '../side-menus.service';

@Component({
  selector: 'app-search-menu',
  templateUrl: './search-menu.component.html',
  styleUrls: ['./search-menu.component.scss']
})
export class SearchMenuComponent implements OnInit {
  @HostBinding('class.actions-on-top') topActions = true;

  constructor(
    private sideMenusService: SideMenusService
  ) { }

  ngOnInit() {
  }

  closeAltMenu(): void {
    this.sideMenusService.toggleAltMenuSubject.next('close');
  }
}
