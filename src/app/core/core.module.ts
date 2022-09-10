import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../archive/shared/shared.module';
import { LayoutModule } from '@angular/cdk/layout';
import { RouterModule } from '@angular/router';
import {
  // Side Menu
  MatSidenavModule,
  // Items inside Side Menu
  MatExpansionModule
} from '@angular/material';

import { PortalModule } from '@angular/cdk/portal';

import {
  // Top Navbar
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';

import { OptionALayoutComponent } from './layouts/option-a/option-a-layout.component';
import { OptionBLayoutComponent } from './layouts/option-b/option-b-layout.component';
import { OptionCLayoutComponent } from './layouts/option-c/option-c-layout.component';
import { OptionDLayoutComponent } from './layouts/option-d/option-d-layout.component';
import { EmptyLayoutComponent } from './layouts/empty/empty-layout.component';

import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { SideNavbarComponent } from './side-navbar/side-navbar.component';
import { MainMenuComponent } from './side-menus/main-menu/main-menu.component';
import { DynamicMenuComponent } from './side-menus/dynamic-menu/dynamic-menu.component';
import { NotificationsMenuComponent } from './side-menus/notifications-menu/notifications-menu.component';
import { SettingsMenuComponent } from './side-menus/settings-menu/settings-menu.component';
import { SearchMenuComponent } from './side-menus/search-menu/search-menu.component';

import { ColorPalettesService } from './color-palettes/color-palettes.service';
import { CustomIconsService } from './custom-icons/custom-icons.service';
import { MobileLayoutComponent } from './layouts/mobile/mobile-layout.component';
import { DynamicLayoutComponent } from './layouts/dynamic/dynamic-layout.component';
import { ReportsService } from '../services/reports/reports.service';

@NgModule({
  declarations: [
    OptionALayoutComponent,
    OptionBLayoutComponent,
    OptionCLayoutComponent,
    OptionDLayoutComponent,
    EmptyLayoutComponent,
    TopNavbarComponent,
    SideNavbarComponent,
    MainMenuComponent,
    DynamicMenuComponent,
    NotificationsMenuComponent,
    SettingsMenuComponent,
    SearchMenuComponent,
    MobileLayoutComponent,
    DynamicLayoutComponent
  ],
  entryComponents: [
    OptionALayoutComponent,
    OptionBLayoutComponent,
    OptionCLayoutComponent,
    OptionDLayoutComponent,
    EmptyLayoutComponent,
    NotificationsMenuComponent,
    SettingsMenuComponent,
    SearchMenuComponent,
    MobileLayoutComponent,
    DynamicLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    // Material CDK modules
    PortalModule,
    // To detect screen size changes
    LayoutModule,
    // Material modules
    MatSidenavModule,
    MatExpansionModule,
    // Ng Bootstrap modules
    NgbDropdownModule
  ],
  exports: [
    OptionALayoutComponent,
    OptionBLayoutComponent,
    OptionCLayoutComponent,
    OptionDLayoutComponent,
    EmptyLayoutComponent,
    TopNavbarComponent,
    SideNavbarComponent,
    MainMenuComponent,
    DynamicMenuComponent,
    NotificationsMenuComponent,
    SettingsMenuComponent,
    SearchMenuComponent,
    MobileLayoutComponent,
    DynamicLayoutComponent
  ],
  providers: [
    // Inspired in: https://devblogs.microsoft.com/premier-developer/angular-how-to-editable-config-files/
    {
      provide: APP_INITIALIZER,
      useFactory: (colorPalettesService: ColorPalettesService) => {
        return () => colorPalettesService.init();
      },
      deps: [ColorPalettesService],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (customIconsService: CustomIconsService) => {
        return () => customIconsService.init();
      },
      deps: [CustomIconsService],
      multi: true
    },
    ReportsService
  ]
})
export class CoreModule { }
