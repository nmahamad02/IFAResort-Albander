import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { LayoutsService } from './core/layouts/layouts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  title = 'fully-angular-admin-template';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private breakpointObserver: BreakpointObserver,
    private layoutsService: LayoutsService
  ) { }

  ngOnInit() {
    // Listen to device size changes to dynamically adjust the layout
    if (isPlatformBrowser(this.platformId)) {
      // Use Angular CDK Breakpoint Observer to detect changes on the screen size
      this.breakpointObserver.observe([
        Breakpoints.XSmall
      ]).subscribe(result => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          // Switch to mobile layout
          const mobileLayoutName = 'mobile';
          this.layoutsService.switchLayout(mobileLayoutName);
        } else {
          // Switch back to previous layout (or the default one)
          const previousLayoutName = this.layoutsService.previousLayout.name;
          this.layoutsService.switchLayout(previousLayoutName);
        }
      });
    }
  }
}
