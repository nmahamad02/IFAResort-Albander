import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListsComponent } from './lists/lists.component';
import { CardsComponent } from './cards/cards.component';
import { CarouselComponent } from './carousel/carousel.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { TabsetsComponent } from './tabsets/tabsets.component';

import { CardsResolver, ListsResolver } from './components.resolver';
import { ComponentsService } from './components.service';

export const componentsRoutes = [
  {
    path: '',
    redirectTo: 'lists'
  },
  {
    path: 'lists',
    component: ListsComponent,
    resolve: {
      data : ListsResolver
    }
  },
  {
    path: 'cards',
    component: CardsComponent,
    resolve: {
      data : CardsResolver
    }
  },
  {
    path: 'carousel',
    component: CarouselComponent
  },
  {
    path: 'tabsets',
    component: TabsetsComponent
  }
];

@NgModule({
  declarations: [ListsComponent, CardsComponent, CarouselComponent, TabsetsComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(componentsRoutes)
  ],
  providers: [
    ComponentsService,
    CardsResolver,
    ListsResolver
  ]
})
export class ComponentsModule { }
