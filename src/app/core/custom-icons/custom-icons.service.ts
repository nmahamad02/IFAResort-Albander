import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CustomIconsService {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {}

  init(): void {
    // register custom icons
    this.registerIcons(
      ['angular-logo-2', 'angular-logo'], '/assets/icons/logos/');
    this.registerIcons(
      ['dashboards', 'forms', 'components', 'charts', 'tables', 'utilities'], '/assets/icons/sidemenu/');
    this.registerIcons(
      ['notifications', 'settings', 'search'], '/assets/icons/navbar/');
    this.registerIcons(
      ['calendar', 'arrow-up', 'arrow-down', 'half-arrow-down', 'drag'], '/assets/icons/dashboards/crm/');
    this.registerIcons(
      ['sales', 'earnings', 'commissions-paid', 'orders', 'calendar', 'desktop', 'tablet', 'mobile', 'watch'],
      '/assets/icons/dashboards/ecommerce/'
    );
    this.registerIcons(
      ['upload', 'image'], '/assets/icons/utilities/');
  }

  registerIcons(icons: Array<string>, path: string) {
    icons.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(path + icon + '.svg')
      );
    });
  }
}
