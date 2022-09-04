import { Type } from '@angular/core';

import { OptionALayoutComponent } from './core/layouts/option-a/option-a-layout.component';
import { OptionBLayoutComponent } from './core/layouts/option-b/option-b-layout.component';
import { OptionCLayoutComponent } from './core/layouts/option-c/option-c-layout.component';
import { OptionDLayoutComponent } from './core/layouts/option-d/option-d-layout.component';
import { MobileLayoutComponent } from './core/layouts/mobile/mobile-layout.component';

interface IAppLayout {
  name: string;
  component: Type<any>;
}

const availableLayouts: Array<IAppLayout> = [
  {
    name: 'A',
    component: OptionALayoutComponent
  },
  {
    name: 'B',
    component: OptionBLayoutComponent
  },
  {
    name: 'C',
    component: OptionCLayoutComponent
  },
  {
    name: 'D',
    component: OptionDLayoutComponent
  },
  {
    name: 'mobile',
    component: MobileLayoutComponent
  }
];

// Select the default layout
const defaultLayout: IAppLayout = availableLayouts.find((layout: IAppLayout) => {
  return layout.name === 'B';
  // return layout.name === 'D';
});

export { IAppLayout, availableLayouts, defaultLayout };
