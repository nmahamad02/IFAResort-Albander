
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CrmService } from 'src/app/services/crm/crm.service';
import { DataSharingService } from 'src/app/services/data-sharing/data-sharing.service';
import { FinanceService } from 'src/app/services/finance/finance.service';

@Component({
  selector: 'app-receipts-allocation',
  templateUrl: './receipts-allocation.component.html',
  styleUrls: ['./receipts-allocation.component.scss']
})
export class ReceiptsAllocationComponent implements OnInit {
  allocationForm: FormGroup;

  mAllocData: any;

  mPartyName: string = "";
  mPartyId: string = "";
  mPartyPhone: string = "";
  mPartyAdd1: string = "";
  mPartyAdd2: string = "";
  mPartyAdd3: string = "";
  mPartyEmail: string = "";
  mPartyTelephone: string = "";

  mRvcNo: string = "";
  mReceiptAmount = 0;
  mPrevRecAmount = 0;
  mAllocatedAmount = 0;
  mBalanceAmount = 0;

  utc = new Date();
  mCurDate = this.formatDate(this.utc);
  mCYear = new Date().getFullYear();
  
  constructor(private crmservice: CrmService,private dialog:MatDialog,public snackBar: MatSnackBar,private financeService: FinanceService,private route: ActivatedRoute, private router: Router, private dataSharing: DataSharingService) {
    this.allocationForm = new FormGroup({
      invNo: new FormControl('', []),
      invDate: new FormControl('', []),
      invAmount: new FormControl('', []),
      invBalance: new FormControl('', []),
      pcode: new FormControl('', []),
      rvcNo: new FormControl('', []),
      rvcDate: new FormControl('', []),
      rvcPrevAmt: new FormControl('', []),
      rvcAmount: new FormControl('', []),
      rvcDesc: new FormControl('', []),
      rvcRemarks: new FormControl('', []),
      rvcBalance: new FormControl('', []),
      rvcPaymentType: new FormControl('', []),
      rvcBank: new FormControl('', []),
    })
  }

  ngOnInit(): void {
    this.mAllocData = this.dataSharing.getData();
    if(this.mAllocData.invBalance < this.mAllocData.rvcAmount) {
      this.allocationForm.patchValue({
        invNo: this.mAllocData.invNo,
        invDate: this.mAllocData.invDate,
        invAmount: this.mAllocData.invAmount,
        invBalance: this.mAllocData.invBalance,
        pcode: this.mAllocData.pcode,
        rvcNo: this.mAllocData.rvcNo,
        rvcDate: this.mAllocData.rvcDate,
        rvcPrevAmt: this.mAllocData.rvcPrevAmt,
        rvcAmount: this.mAllocData.invBalance,
        rvcDesc: this.mAllocData.rvcDesc,
        rvcRemarks: this.mAllocData.rvcRemarks,
        rvcBalance: this.mAllocData.rvcAmount - this.mAllocData.invBalance,
        rvcPaymentType: this.mAllocData.rvcPaymentType,
        rvcBank: this.mAllocData.rvcBank,
      });
      const data = this.allocationForm.value;
      this.mReceiptAmount =  this.mAllocData.rvcAmount;
      this.mAllocatedAmount = data.rvcAmount;
      this.mPrevRecAmount = this.mAllocData.rvcPrevAmt;
      this.mBalanceAmount = this.mReceiptAmount - this.mAllocatedAmount;
    } else {
      this.allocationForm.patchValue({
        invNo: this.mAllocData.invNo,
        invDate: this.mAllocData.invDate,
        invAmount: this.mAllocData.invAmount,
        invBalance: this.mAllocData.invBalance,
        pcode: this.mAllocData.pcode,
        rvcNo: this.mAllocData.rvcNo,
        rvcDate: this.mAllocData.rvcDate,
        rvcPrevAmt: this.mAllocData.rvcPrevAmt,
        rvcAmount: this.mAllocData.rvcAmount,
        rvcDesc: this.mAllocData.rvcDesc,
        rvcRemarks: this.mAllocData.rvcRemarks,
        rvcBalance: this.mAllocData.invAmount - (this.mAllocData.rvcAmount + this.mAllocData.rvcPrevAmt),
        rvcPaymentType: this.mAllocData.rvcPaymentType,
        rvcBank: this.mAllocData.rvcBank,
      });
      const data = this.allocationForm.value;
      this.mReceiptAmount =  this.mAllocData.rvcAmount;
      this.mAllocatedAmount = data.rvcAmount;
      this.mPrevRecAmount = this.mAllocData.rvcPrevAmt;
      this.mBalanceAmount = this.mReceiptAmount - this.mAllocatedAmount;
    }
    
    this.mPartyName = this.mAllocData.mPartyName;
    this.mPartyId = this.mAllocData.mPartyId;
    this.mPartyPhone = this.mAllocData.mPartyPhone;
    this.mPartyAdd1 = this.mAllocData.mPartyAdd1;
    this.mPartyAdd2 = this.mAllocData.mPartyAdd2;
    this.mPartyAdd3 = this.mAllocData.mPartyAdd3;
    this.mPartyEmail = this.mAllocData.mPartyEmail;
    this.mPartyTelephone = this.mAllocData.mPartyTelephone;
    this.mRvcNo = this.mAllocData.rvcNo;
  }

  returnToReceipt(){
    var id = this.mRvcNo;
    var myurl = `/crm/receipt/details/${id}`;
    this.router.navigateByUrl(myurl).then(e => {
    });
  }

  onFormSubmit(){
    const rvcData = this.allocationForm.value;
    console.log(rvcData);
    if(this.mBalanceAmount > 0) {
      this.financeService.setAllocationReceipt(rvcData.invNo, rvcData.rvcNo, rvcData.rvcDate, rvcData.rvcAmount, rvcData.rvcDesc, rvcData.rvcRemarks, rvcData.rvcPaymentType, rvcData.rvcBank).subscribe((res: any) => {
        console.log(res);
        this.financeService.deleteFromOutstanding(rvcData.rvcNo).subscribe((resp: any) => {
          console.log(resp);
          this.financeService.postOutstanding(String(this.mCYear), rvcData.rvcNo, rvcData.rvcDate, rvcData.pcode,'RVC', rvcData.rvcNo, rvcData.rvcDate, '0', String(this.mBalanceAmount), rvcData.rvcDesc, rvcData.rvcRemarks, rvcData.rvcPaymentType, rvcData.rvcBank).subscribe((respon: any) => {
            console.log(respon);
            this.returnToReceipt();
          }, (error: any) => {
            console.log(error)
          })
        }, (errr: any) => {
          console.log(errr)
        })
      }, (err: any) => {
        console.log(err);
      })
    } else {
      if(this.mPrevRecAmount > 0) {
        this.financeService.postOutstanding(String(this.mCYear), rvcData.invNo, rvcData.invDate, rvcData.pcode, 'INV', rvcData.rvcNo, rvcData.rvcDate, '0', rvcData.rvcAmount,  rvcData.rvcDesc, rvcData.rvcRemarks, rvcData.rvcPaymentType, rvcData.rvcBank).subscribe((respon: any) => {
          console.log(respon);
          this.financeService.deleteFromOutstanding(rvcData.rvcNo).subscribe((resp: any) => {
            console.log(resp);
            this.returnToReceipt();
          })
        }, (error: any) => {
          console.log(error)
        })
      } else {
        this.financeService.setAllocationReceipt(rvcData.invNo, rvcData.rvcNo, rvcData.rvcDate, rvcData.rvcAmount, rvcData.rvcDesc, rvcData.rvcRemarks, rvcData.rvcPaymentType, rvcData.rvcBank).subscribe((res: any) => {
          console.log(res);
          this.financeService.deleteFromOutstanding(rvcData.rvcNo).subscribe((resp: any) => {
            console.log(resp);
            if(this.mBalanceAmount > 0) {
              this.financeService.postOutstanding(String(this.mCYear), rvcData.rvcNo, rvcData.rvcDate, rvcData.pcode,'RVC', rvcData.rvcNo, rvcData.rvcDate, '0', String(this.mBalanceAmount), rvcData.rvcDesc, rvcData.rvcRemarks, rvcData.rvcPaymentType, rvcData.rvcBank).subscribe((respon: any) => {
                console.log(respon);
                this.returnToReceipt();
              }, (error: any) => {
                console.log(error)
              })
            } else {
              this.returnToReceipt();
            }
          }, (errr: any) => {
            console.log(errr)
          })
        }, (err: any) => {
          console.log(err);
        })
      }
    }
    
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
