import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgreementListComponent } from './agreement-component/agreement-list/agreement-list.component';
import { AgreementComponent } from './agreement-component/agreement/agreement.component';
import { SharedModule } from 'src/app/archive/shared/shared.module';
import { RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-component/customer-list/customer-list.component';
import { CustomerComponent } from './customer-component/customer/customer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule} from '@angular/material/card'
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { MatTableExporterModule } from 'mat-table-exporter';
import { ContactsListComponent } from './contact-component/contacts-list/contacts-list.component';
import { ContactsComponent } from './contact-component/contacts/contacts.component';
import { InvoiceListComponent } from './invoice-component/invoice-list/invoice-list.component';
import { InvoiceComponent } from './invoice-component/invoice/invoice.component';
import { MembersListComponent } from './member-component/members-list/members-list.component';
import { MembersComponent } from './member-component/members/members.component';
import { ReceiptsListComponent } from './receipt-component/receipts-list/receipts-list.component';
import { ReceiptsAllocationComponent } from './receipt-component/receipts-allocation/receipts-allocation.component';
import { ReceiptsComponent } from './receipt-component/receipts/receipts.component';
import { ServiceListComponent } from './service-component/service-list/service-list.component';
import { ServiceComponent } from './service-component/service/service.component';

export const crmRoutes = [
  {
    path: 'agreements',
    component: AgreementListComponent
  },
  {
    path: 'agreements/details/:id',
    component: AgreementComponent
  },
  {
    path: 'customers',
    component: CustomerListComponent
  },
  {
    path: 'customer/details/:id',
    component: CustomerComponent
  },  
  {
    path: 'contacts',
    component: ContactsListComponent
  },
  {
    path: 'contact/details/:id',
    component: ContactsComponent
  },
  {
    path: 'invoices',
    component: InvoiceListComponent
  },
  {
    path: 'invoice/details/:id',
    component: InvoiceComponent
  },
  {
    path: 'members',
    component: MembersListComponent
  },
  {
    path: 'member/details/:id',
    component: MembersComponent
  },
  {
    path: 'receipts',
    component: ReceiptsListComponent
  },
  {
    path: 'receipt/details/:id',
    component: ReceiptsComponent
  },
  {
    path: 'receipt/details/:id/allocation',
    component: ReceiptsAllocationComponent
  },
  {
    path: 'services',
    component: ServiceListComponent
  },
  {
    path: 'services/details/:id',
    component: ServiceComponent
  },
];

@NgModule({
  declarations: [
    AgreementListComponent, 
    AgreementComponent, 
    CustomerListComponent, 
    CustomerComponent, 
    ContactsListComponent, 
    ContactsComponent,
    InvoiceListComponent, 
    InvoiceComponent, 
    MembersListComponent, 
    MembersComponent, 
    ReceiptsListComponent, 
    ReceiptsAllocationComponent, 
    ReceiptsComponent, ServiceListComponent, ServiceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatSelectModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableExporterModule,
    RouterModule.forChild(crmRoutes)
  ]
})
export class CrmModule { }
