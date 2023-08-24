import { Component, OnInit, HostBinding } from '@angular/core';
import { SideMenusService } from '../side-menus.service';
import { Subscription, timer} from 'rxjs'; 
import { map } from 'rxjs/operators';
import { ReportsService } from 'src/app/services/reports/reports.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notifications-menu',
  templateUrl: './notifications-menu.component.html',
  styleUrls: ['./notifications-menu.component.scss']
})
export class NotificationsMenuComponent implements OnInit {
  @HostBinding('class.actions-on-top') topActions = true;

  constructor(private sideMenusService: SideMenusService, private reportsService: ReportsService, private router: Router) { }
  mCMonth = new Date().getMonth();

  expAgrArr: any[]

  timerSubscription: Subscription; 

  ngOnInit() {
    this.timerSubscription = timer(0, 10000).pipe( 
      map(() => { 
        this.getData()
      }) 
    ).subscribe(); 
  }

  ngOnDestroy(): void { 
    this.timerSubscription.unsubscribe(); 
  } 

  getData() {
    this.reportsService.getMonthlyExpiringAgreements(String(this.mCMonth + 1)).subscribe((res: any) => {
      console.log(res.recordset)
      this.expAgrArr = res.recordset
    })
  }

  public gotoAgreementDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

  closeAltMenu(): void {
    this.sideMenusService.toggleAltMenuSubject.next('close');
  }
}
