import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatSnackBar, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceService } from 'src/app/services/finance/finance.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {

  srvArr: any[] = [];

  serviceForm: FormGroup;

  @ViewChild('srvLookupDialog', { static: false }) srvLookupDialog!: TemplateRef<any>;

  utc = new Date();
  mCurDate = this.formatDate(this.utc);
  mCYear = new Date().getFullYear();

  srvDisplayedColumns: string[] = ['ServiceID', 'servicedesc', 'memberprice'];
  srvDataSource = new MatTableDataSource(this.srvArr);

  selectedRowIndex: any = 0;

  constructor(private financeService: FinanceService, private router: Router,private dialog: MatDialog, private route: ActivatedRoute,public snackBar: MatSnackBar) {
    this.serviceForm = new FormGroup({ 
      srvNo: new FormControl('', [Validators.required]),
      srvName: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    })
   }

   refreshForm() {
    this.serviceForm = new FormGroup({ 
      srvNo: new FormControl('', [Validators.required]),
      srvName: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    })
  }

  newForm() {
    this.serviceForm = new FormGroup({ 
      srvNo: new FormControl('***NEW***', [Validators.required]),
      srvName: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
    })
  }

  lookupService() {
    this.selectedRowIndex = 0
    let dialogRef = this.dialog.open(this.srvLookupDialog);
    this.financeService.getAllService().subscribe((res: any) => {
      this.srvArr = res.recordset;
      this.srvDataSource = new MatTableDataSource(this.srvArr);
    })
  }

  ngOnInit() {
    this.getDetails(this.route.snapshot.params.id);
  }

  getDetails(value: any) {
    if(value === 'new') {
      this.newForm();
    } else {
      this.financeService.getServiceDetails(value).subscribe((res: any) => {
        const data = res.recordset[0];
        this.onViewCellClicked(data);
      }, (err: any) => {
        console.log(err);
      })
    }
  }
  
  onViewCellClicked(event: any) {
    this.refreshForm();
    this.serviceForm.patchValue({
      srvNo: event.ServiceID,
      srvName: event.ServiceName,
      price: event.MemberPrice,
    })
    let dialogRef = this.dialog.closeAll();
  }

  getService(srvID: string) {
    this.getDetails(srvID)
  }

  onFormSubmit() {
    const data = this.serviceForm.value;
    console.log(data);
    if(data.srvNo === '***NEW***') {
      this.financeService.postService('0', data.srvName, data.price, this.mCurDate)
      this.snackBar.open(data.srvName + " successfully Added", "close", {
        duration: 10000,
        verticalPosition: 'top',
        panelClass: ['sbBg']
      });
      this.refreshForm();
    } else {
      this.financeService.updateserviceMaster(data.srvNo, data.srvName, data.price, this.mCurDate)
      this.snackBar.open(data.srvName + " successfully Updated", "close", {
        duration: 10000,
        verticalPosition: 'top',
        panelClass: ['sbBg']
      });
      this.refreshForm();
    }
  }

  deleteService(){
    const data = this.serviceForm.value;
    console.log(data);
    if(data.srvNo != '***NEW***') {
      this.financeService.deleteService(data.srvNo).subscribe((resp: any) => {
        this.snackBar.open(data.srvName + " successfully deleted", "close", {
          duration: 10000,
          verticalPosition: 'top',
          panelClass: ['sbBg']
        });
        this.refreshForm();
      }, (err: any) => {
        console.log(err)
      })
    }
  }

  highlight(index: number){
    console.log(index);
    if(index >= 0 && index <= this.srvArr.length - 1)
    this.selectedRowIndex = index;
  }

  arrowUpEvent(index: number){
   this.highlight(--index);
  }

  arrowDownEvent(index: number){
    this.highlight(++index);
  }
 
  formatDate(date: any) {
    var d = new Date(date), day = '' + d.getDate(), month = '' + (d.getMonth() + 1), year = d.getFullYear();

    if (day.length < 2) {
      day = '0' + day;
    } 
    if (month.length < 2) {
      month = '0' + month;
    }
    return [day, month, year].join('-');
  }
}
