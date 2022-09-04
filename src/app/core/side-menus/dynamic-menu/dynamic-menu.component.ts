import { Component, OnInit, ViewChild, OnDestroy, AfterViewInit, ComponentRef } from '@angular/core';
import { CdkPortalOutlet, Portal, ComponentPortal } from '@angular/cdk/portal';
import { NotificationsMenuComponent } from '../notifications-menu/notifications-menu.component';
import { SettingsMenuComponent } from '../settings-menu/settings-menu.component';
import { Subscription } from 'rxjs';
import { SideMenusService } from '../side-menus.service';
import { SearchMenuComponent } from '../search-menu/search-menu.component';

@Component({
  selector: 'app-dynamic-menu',
  templateUrl: './dynamic-menu.component.html',
  styleUrls: ['./dynamic-menu.component.scss']
})
export class DynamicMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(CdkPortalOutlet, {static: false}) dynamicMenuPortalOutlet: CdkPortalOutlet;

  dynamicMenuPortal: Portal<any>;
  notificationsMenuComponentPortal: ComponentPortal<NotificationsMenuComponent>;
  settingsMenuComponentPortal: ComponentPortal<SettingsMenuComponent>;
  searchMenuComponentPortal: ComponentPortal<SearchMenuComponent>;

  // Subscription to the Dynamic Menu Portal Outlet content (portals) attachment events
  dynamicMenuPortalSubscription: Subscription;
  // Subscription to the Dynamic Menu Portals (content) loading/rendering
  dynamicMenuContentSubscription: Subscription;

  constructor(
    private sideMenusService: SideMenusService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.dynamicMenuPortalSubscription.unsubscribe();
    this.dynamicMenuContentSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dynamicMenuPortalSubscription = this.dynamicMenuPortalOutlet.attached.subscribe(
      (event: ComponentRef<any>) => {
      },
      (error) => {
        console.log('DynamicMenu attached [DynamicMenuComponent] - error', error);
      },
      () => {}
    );

    this.dynamicMenuContentSubscription = this.sideMenusService.renderAltMenuSubject.subscribe(
      (event) => {
        switch (event) {
          case 'notifications':
            if (!this.notificationsMenuComponentPortal) {
              this.notificationsMenuComponentPortal = new ComponentPortal(NotificationsMenuComponent);
            }

            this.dynamicMenuPortal = this.notificationsMenuComponentPortal;
            break;
          case 'settings':
            if (!this.settingsMenuComponentPortal) {
              this.settingsMenuComponentPortal = new ComponentPortal(SettingsMenuComponent);
            }

            this.dynamicMenuPortal = this.settingsMenuComponentPortal;
            break;
          case 'search':
            if (!this.searchMenuComponentPortal) {
              this.searchMenuComponentPortal = new ComponentPortal(SearchMenuComponent);
            }

            this.dynamicMenuPortal = this.searchMenuComponentPortal;
            break;
          default:
            // Do nothing or render an error component?
        }
      },
      (error) => {
        console.log('renderAltMenu [DynamicMenuComponent] - error', error);
      },
      () => {}
    );
  }
}
