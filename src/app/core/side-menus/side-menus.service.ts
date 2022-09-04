import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenusService {
  public toggleMainMenuSubject: Subject<any> = new Subject();

  public toggleAltMenuSubject: Subject<any> = new Subject();
  public renderAltMenuSubject: Subject<any> = new Subject();

  public changeMainMenuModeSubject: Subject<any> = new Subject();

  constructor() { }
}
