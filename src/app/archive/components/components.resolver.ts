import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ComponentsService } from './components.service';

@Injectable()
export class CardsResolver implements Resolve<any> {

  constructor(private componentsService: ComponentsService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.componentsService.getCardsPageData()
      .subscribe((data: any) => {
        return resolve(data);
      });
    });
  }
}

@Injectable()
export class ListsResolver implements Resolve<any> {

  constructor(private componentsService: ComponentsService) {}

  resolve() {
    return new Promise((resolve, reject) => {
      this.componentsService.getListsPageData()
      .subscribe((data: any) => {
        return resolve(data);
      });
    });
  }
}
