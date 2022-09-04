import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Inject, PLATFORM_ID, Optional } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { TransferState, makeStateKey } from '@angular/platform-browser';
import { RESPONSE } from '@nguniversal/express-engine/tokens';
import { CdkPortalOutlet, Portal, ComponentPortal } from '@angular/cdk/portal';
import { Subscription } from 'rxjs';

import { LayoutsService } from '../layouts.service';
import { IAppLayout, availableLayouts, defaultLayout } from 'src/app/app-layouts';

const MOBILE_DEVICE = makeStateKey('mobile-device');

@Component({
  selector: 'app-dynamic-layout',
  templateUrl: './dynamic-layout.component.html'
})
export class DynamicLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  // dynamicLayoutPortalOutlet is a reference to the <ng-template> in the view that's gonna render the different layouts
  @ViewChild(CdkPortalOutlet, {static: false}) dynamicLayoutPortalOutlet: CdkPortalOutlet;

  // dynamicLayoutPortal is a reference to the portal that we are gonna render in the dynamicLayoutPortalOutlet
  dynamicLayoutPortal: Portal<any>;

  // Subscription to the Dynamic Layout switching mechanism
  dynamicLayoutSwitchSubscription: Subscription;

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Optional() @Inject(RESPONSE) private response: any,
    private state: TransferState,
    private layoutsService: LayoutsService
  ) {
    // Check if the user is requesting the app from a mobile device
    let mobileDevice = 'not-mobile';

    // In our server.ts we added a custom response header with information about the device requesting the app
    if (isPlatformServer(this.platformId)) {
      if (this.response && this.response !== null) {
        // Get custom header from the response sent from the server.ts
        const mobileDeviceHeader = this.response.get('mobile-device');

        // If the mobile-device header is not null, then the user is requesting the app from a mobile device. Override reference.
        if (mobileDeviceHeader && mobileDeviceHeader !== 'null') {
          mobileDevice = mobileDeviceHeader;
        }
      }

      // Set the mobileDevice reference using Angular TransferState mechanisms so we can have this reference ready
      // when the app transitions from server side rendering to client side rendering
      this.state.set(MOBILE_DEVICE, mobileDevice as string);

      console.log('we\'re rendering from the server, checking response object.');
      console.log(`MOBILE_DEVICE from RESPONSE: ${mobileDevice}`);
    } else {
      mobileDevice = this.state.get(MOBILE_DEVICE, mobileDevice as any);

      console.log('we\'re rendering from the browser, there is no response object.');
      console.log(`MOBILE_DEVICE from TransferState: ${mobileDevice}`);
    }

    if (mobileDevice !== 'not-mobile') {
      this.renderLayoutPortal('mobile');
    } else {
      this.renderLayoutPortal(defaultLayout.name);
    }
  }

  ngOnInit() { }

  ngOnDestroy() {
    this.dynamicLayoutSwitchSubscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.dynamicLayoutSwitchSubscription = this.layoutsService.switchLayoutSubject.subscribe(
      (selectedLayoutName) => {
        this.renderLayoutPortal(selectedLayoutName);
      },
      (error) => {
        console.log('switchLayoutSubject [DynamicLayoutComponent] - error', error);
      },
      () => {
        console.log('switchLayoutSubject [DynamicLayoutComponent] - complete');
      }
    );
  }

  renderLayoutPortal(layoutName: string): void {
    // Check if the layout we want to render exists. We check against the list defined in the src/app-layouts.ts file
    const layoutToRender: IAppLayout = availableLayouts.find((layout: IAppLayout) => {
      return layout.name === layoutName;
    });

    if (layoutToRender) {
      this.dynamicLayoutPortal = new ComponentPortal(layoutToRender.component);
    }
  }
}
