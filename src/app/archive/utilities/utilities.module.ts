import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationsComponent } from './notifications/notifications.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ModalsComponent } from './modals/modals.component';
import { AlertsComponent } from './alerts/alerts.component';
import { AutocompleteComponent } from './autocomplete/autocomplete.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { CreateAccountModalComponent } from './modals/templates/create-account-modal/create-account-modal.component';
import { SignInModalComponent } from './modals/templates/sign-in-modal/sign-in-modal.component';
import { UtilitiesService } from './utilities.service';

export const notificationsRoutes = [
  {
    path: '',
    redirectTo: 'notifications'
  },
  {
    path: 'notifications',
    component: NotificationsComponent
  },
  {
    path: 'alerts',
    component: AlertsComponent
  },
  {
    path: 'modals',
    component: ModalsComponent
  },
  {
    path: 'file-uploader',
    component: FileUploaderComponent
  },
  {
    path: 'autocomplete',
    component: AutocompleteComponent
  }
];

@NgModule({
  declarations: [
    NotificationsComponent,
    ModalsComponent,
    AlertsComponent,
    AutocompleteComponent,
    FileUploaderComponent,
    CreateAccountModalComponent,
    SignInModalComponent
  ],
  providers: [
    UtilitiesService
  ],
  entryComponents: [
    CreateAccountModalComponent,
    SignInModalComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(notificationsRoutes)
  ]
})
export class UtilitiesModule { }
