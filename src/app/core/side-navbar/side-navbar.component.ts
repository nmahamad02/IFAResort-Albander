import { Component, OnInit } from '@angular/core';
import { SideMenusService } from '../side-menus/side-menus.service';
import { LoggedUserModel } from 'src/app/modules/authentication/logged-user.model';
import { AuthenticationService } from 'src/app/modules/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: [
    './styles/side-navbar.component.scss'
  ]
})
export class SideNavbarComponent implements OnInit {
  loggedUser: LoggedUserModel = null;

  constructor(
    private sideMenusService: SideMenusService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    this.authenticationService.loggedUserSubject.subscribe({
      next: (loggedUser) => {
        this.loggedUser = loggedUser;
      }
    });
  }

  ngOnInit() {
  }

  logout() {
    this.authenticationService.logout().subscribe(
      () => this.router.navigate(['authentication/signin'])
    );
  }

  toggleAltMenu(): void {
    this.sideMenusService.toggleAltMenuSubject.next('toggle');
  }

  toggleSettingsMenu(): void {
    this.sideMenusService.renderAltMenuSubject.next('settings');
    this.toggleAltMenu();
  }

  toggleNotificationsMenu(): void {
    this.sideMenusService.renderAltMenuSubject.next('notifications');
    this.toggleAltMenu();
  }

  toggleSearchMenu(): void {
    this.sideMenusService.renderAltMenuSubject.next('search');
    this.toggleAltMenu();
  }
}
