import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { defaultLayout, availableLayouts, IAppLayout } from 'src/app/app-layouts';

@Injectable({
  providedIn: 'root'
})
export class LayoutsService {
  previousLayout: IAppLayout = defaultLayout;
  currentLayout: IAppLayout = defaultLayout;

  public switchLayoutSubject: Subject<any> = new Subject();

  constructor() { }

  switchLayout(selectedLayoutName: string): void {
    selectedLayoutName = (selectedLayoutName) ? selectedLayoutName : this.currentLayout.name;

    if (selectedLayoutName && selectedLayoutName !== this.currentLayout.name) {
      const selectedLayout: IAppLayout = availableLayouts.find((layout: IAppLayout) => {
        return layout.name === selectedLayoutName;
      });

      if (selectedLayout) {
        this.previousLayout = this.currentLayout;
        this.currentLayout = selectedLayout;

        this.switchLayoutSubject.next(selectedLayout.name);
      }
    }
  }
}
