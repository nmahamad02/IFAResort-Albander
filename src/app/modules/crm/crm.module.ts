import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreementListComponent } from './agreement-component/agreement-list/agreement-list.component';
import { AgreementComponent } from './agreement-component/agreement/agreement.component';
import { SharedModule } from 'src/app/archive/shared/shared.module';
import { RouterModule } from '@angular/router';

export const crmRoutes = [
  {
    path: 'agreement',
    component: AgreementListComponent
  },
  {
    path: 'agreement/details/:id',
    component: AgreementComponent
  },
];

@NgModule({
  declarations: [
    AgreementListComponent, 
    AgreementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(crmRoutes)
  ]
})
export class CrmModule { }
