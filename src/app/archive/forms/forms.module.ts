import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialFormsComponent } from './material-forms/material-forms.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { StepperComponent } from './stepper/stepper.component';
import { ExtendedControlsComponent } from './extended-controls/extended-controls.component';
import { FormLayoutsComponent } from './form-layouts/form-layouts.component';
import { ControlsAndValidationsComponent } from './controls-and-validations/controls-and-validations.component';
import { FormsService } from './forms.service';

export const formsRoutes = [
  {
    path: '',
    redirectTo: 'material-forms'
  },
  {
    path: 'material-forms',
    component: MaterialFormsComponent,
  },
  {
    path: 'stepper',
    component: StepperComponent,
  },
  {
    path: 'controls-and-validations',
    component: ControlsAndValidationsComponent,
  },
  {
    path: 'extended-controls',
    component: ExtendedControlsComponent,
  },
  {
    path: 'form-layouts',
    component: FormLayoutsComponent,
  }
];

@NgModule({
  declarations: [
    MaterialFormsComponent,
    StepperComponent,
    ExtendedControlsComponent,
    FormLayoutsComponent,
    ControlsAndValidationsComponent
  ],
  providers: [
    FormsService
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(formsRoutes)
  ]
})

export class FormsModule { }
