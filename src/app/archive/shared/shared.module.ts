import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatToolbarModule,
  MatMenuModule,
  MatButtonModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatTableModule,
  MatTabsModule,
  MatProgressBarModule,
  MatSortModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatInputModule,
  MatNativeDateModule,
  MatChipsModule,
  MatSelectModule,
  MatStepperModule,
  MatTooltipModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
  MatSliderModule
} from '@angular/material';

import {
  NgbButtonsModule,
  NgbProgressbarModule,
  NgbDatepickerModule,
  NgbRatingModule,
  NgbTimepickerModule,
  NgbPopoverModule,
  NgbCarouselModule,
  NgbTabsetModule,
  NgbTypeaheadModule,
  NgbDropdownModule
} from '@ng-bootstrap/ng-bootstrap';

// import { HttpClientModule } from '@angular/common/http';

import { ShellModule } from '../shell/shell.module';
import { FileUploaderDirective } from './file-uploader/file-uploader.directive';
import { ShowHidePasswordComponent } from './show-hide-password/show-hide-password.component';
import { ShowHideInputDirective } from './show-hide-password/show-hide-input.directive';
import { AlertTemplateComponent } from './alert-template/alert-template.component';
import { NotificationTemplateComponent } from './notification-template/notification-template.component';

@NgModule({
  declarations: [
    FileUploaderDirective,
    ShowHidePasswordComponent,
    ShowHideInputDirective,
    AlertTemplateComponent,
    NotificationTemplateComponent
  ],
  entryComponents: [
    AlertTemplateComponent,
    NotificationTemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ShellModule,
    MatIconModule,
    MatDialogModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    // HttpClientModule
  ],
  exports: [
    // Re-export these modules to prevent repeated imports (see: https://angular.io/guide/ngmodule#re-exporting-other-modules)
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClientModule,
    ShellModule,
    RouterModule,
    FileUploaderDirective,
    ShowHidePasswordComponent,
    ShowHideInputDirective,
    AlertTemplateComponent,
    NotificationTemplateComponent,
    // angular material modules
    MatTableModule,
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatInputModule,
    MatNativeDateModule,
    MatChipsModule,
    MatSelectModule,
    MatStepperModule,
    MatTooltipModule,
    MatAutocompleteModule,
    MatButtonToggleModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatSnackBarModule,
    MatSliderModule,
    MatIconModule,  // needed to use the MatIconRegistry to register our own icons
    // ng bootstrap modules
    NgbButtonsModule,
    NgbProgressbarModule,
    NgbDatepickerModule,
    NgbRatingModule,
    NgbTimepickerModule,
    NgbPopoverModule,
    NgbCarouselModule,
    NgbTabsetModule,
    NgbTypeaheadModule,
    NgbDropdownModule
  ]
})
export class SharedModule { }
