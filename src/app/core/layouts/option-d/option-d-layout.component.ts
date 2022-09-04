import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, HostBinding, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { MatSidenav } from '@angular/material';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';

import { ResponsiveBreakpointsService } from '../../responsive-breakpoints.service';
import { SideMenusService } from '../../side-menus/side-menus.service';

@Component({
  selector: 'app-option-d-layout',
  templateUrl: './option-d-layout.component.html',
  styleUrls: ['./option-d-layout.component.scss']
})
export class OptionDLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding('class.layout-d') layoutFlag = true;
  @HostBinding('class.server-side-rendered') serverSideRendered;
  @HostBinding('class.main-sidenav-opened') mainSidenavOpened;
  @HostBinding('class.alt-sidenav-opened') altSidenavOpened;

  @ViewChild('mainSidenav', {static: false}) mainSidenav: MatSidenav;
  @ViewChild('altSidenav', {static: false}) altSidenav: MatSidenav;

  // Subscription to the Main Sidenav movement
  mainSidenavSubscription: Subscription;
  // Subscription to the Alt Sidenav movement
  altSidenavSubscription: Subscription;
  // Subscription to the screen size changes
  screenSizeChangeSubscription: Subscription;
  // Subscription to the main side menu mode changes
  changeMainMenuModeSubscription: Subscription;

  mainSideMenuMode: string;

  constructor(
    private sideMenusService: SideMenusService,
    private responsiveBreakpointsService: ResponsiveBreakpointsService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.serverSideRendered = isPlatformServer(platformId);
    // main menu initialization
    switch (this.responsiveBreakpointsService.currentScreenSize) {
      case 'small':
        this.mainSidenavOpened = false;
        this.mainSideMenuMode = 'push';
        break;
      case 'medium':
        this.mainSidenavOpened = true;
        this.mainSideMenuMode = 'side';
        break;
      case 'large':
        this.mainSidenavOpened = true;
        this.mainSideMenuMode = 'side';
        break;
      default:
        this.mainSidenavOpened = true;
        this.mainSideMenuMode = 'side';
    }
  }

  ngOnInit() {
    // subscribe to screen size changes
    this.screenSizeChangeSubscription = this.responsiveBreakpointsService.screenSizeChangeSubject.pipe(
      delay(0)
    ).subscribe(
      (event) => {
        if (event === 'small') {
          this.sideMenusService.changeMainMenuModeSubject.next('push');
          this.sideMenusService.toggleMainMenuSubject.next('close');
        }
        if (event === 'medium') {
          this.sideMenusService.changeMainMenuModeSubject.next('side');
          this.sideMenusService.toggleMainMenuSubject.next('open');
        }
        if (event === 'large') {
          this.sideMenusService.changeMainMenuModeSubject.next('side');
          this.sideMenusService.toggleMainMenuSubject.next('open');
        }
      }
    );
  }

  ngOnDestroy() {
    this.mainSidenavSubscription.unsubscribe();
    this.altSidenavSubscription.unsubscribe();
    this.screenSizeChangeSubscription.unsubscribe();
    this.changeMainMenuModeSubscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    this.mainSidenavSubscription = this.sideMenusService.toggleMainMenuSubject.subscribe(
      (event) => {
        switch (event) {
          case 'toggle':
            this.mainSidenav.toggle();
            break;
          case 'open':
            this.mainSidenav.open();
            break;
          case 'close':
            this.mainSidenav.close();
            break;
          default:
            this.mainSidenav.toggle();
        }
      },
      (error) => {
        console.log('toggleMainMenu [Layout D] - error', error);
      },
      () => {}
    );

    this.altSidenavSubscription = this.sideMenusService.toggleAltMenuSubject.subscribe(
      (event) => {
        switch (event) {
          case 'toggle':
            this.altSidenav.toggle();
            break;
          case 'open':
            this.altSidenav.open();
            break;
          case 'close':
            this.altSidenav.close();
            break;
          default:
            this.altSidenav.toggle();
        }
      },
      (error) => {
        console.log('toggleAltMenu [Layout D] - error', error);
      },
      () => {}
    );

    this.changeMainMenuModeSubscription = this.sideMenusService.changeMainMenuModeSubject.subscribe(
      (menuMode) => {
        this.mainSideMenuMode = menuMode;
      },
      (error) => {
        console.log('changeMainMenuModeSubject [Layout D] - error', error);
      },
      () => {}
    );
  }

  toggleMainMenu(): void {
    this.sideMenusService.toggleMainMenuSubject.next('toggle');
  }

  // It's better to have the class applied when the opening starts as we want it ready before the opening animation ends
  openedStart(): void {
    this.mainSidenavOpened = true;
  }

  mainSidenavToggled(opened: boolean): void {
    this.mainSidenavOpened = opened;
  }

  altSidenavToggled(opened: boolean): void {
    this.altSidenavOpened = opened;
  }
}
