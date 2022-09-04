import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveBreakpointsService {
  public screenSizeChangeSubject: ReplaySubject<any> = new ReplaySubject(1);
  public currentScreenSize: string;

  constructor(
    private breakpointObserver: BreakpointObserver
  ) {
    const isSmallScreen = this.breakpointObserver.isMatched(
      [Breakpoints.XSmall, Breakpoints.Small]
    );
    const isMediumScreen = this.breakpointObserver.isMatched(
      [Breakpoints.Medium]
    );

    this.currentScreenSize = (isSmallScreen) ? 'small' : (isMediumScreen) ? 'medium' : 'large';

    // Use Angular CDK Breakpoint Observer to detect changes on the screen size
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall] || result.breakpoints[Breakpoints.Small]) {
          this.screenSizeChangeSubject.next('small');
        }

        if (result.breakpoints[Breakpoints.Medium]) {
          this.screenSizeChangeSubject.next('medium');
        }

        if (result.breakpoints[Breakpoints.Large] || result.breakpoints[Breakpoints.XLarge]) {
          this.screenSizeChangeSubject.next('large');
        }
      }
    });
  }
}
