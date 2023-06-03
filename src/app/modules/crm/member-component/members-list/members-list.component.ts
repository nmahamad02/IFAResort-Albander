import { ElementRef, ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CrmService } from 'src/app/services/crm/crm.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from "@angular/material/sort";
import * as XLSX from 'xlsx';
import { Router } from "@angular/router";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
    styleUrls: ['./members-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
})
export class MembersListComponent implements OnInit {

  memberList: any[] = [];
  searchValue: any;
  columnMemberDefs: any;
  isTableExpanded = false;
  memberListDataSource = new MatTableDataSource(this.memberList);

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild('TABLE', { static: false }) table: ElementRef;

  constructor(private crmservice: CrmService, private router: Router) {

      this.columnMemberDefs = ['actions', "REFNO", "NAME", "MEMBTYPE", "buttons"];
  }

  ngOnInit(): void {

    //Get Members Details
    this.getAllPrimaryMembers();

    this.toggleTableRows();
  }

  getAllPrimaryMembers() {
    this.crmservice.getAllMembersIsPrimary().subscribe((res: any) => {
      console.log(this.memberList);
      this.memberList = res.recordset;

      for (let i = 0; i < this.memberList.length; i++) {
        if (this.memberList[i].MEMBTYPE === 'F') {
          this.memberList[i].MEMBTYPE = 'Family';
        }
        else if (this.memberList[i].MEMBTYPE === 'C') {
          this.memberList[i].MEMBTYPE = 'Corporate';
        }
        else if (this.memberList[i].MEMBTYPE === 'S') {
          this.memberList[i].MEMBTYPE = 'Single';
        }
        this.crmservice.getDependentMembers(this.memberList[i].MemberNo).subscribe((res: any) => {
          const famArr = res.recordset;
          for (let i = 0; i < famArr.length; i++) {
            if (famArr[i].MEMBTYPE === 'F') {
              famArr[i].MEMBTYPE = 'Family';
            }
            else if (famArr[i].MEMBTYPE === 'C') {
              famArr[i].MEMBTYPE = 'Corporate';
            }
            else if (famArr[i].MEMBTYPE === 'S') {
              famArr[i].MEMBTYPE = 'Single';
            }
          }
          this.memberList[i].DepenedentMembers = famArr;
        });
      }

      this.memberListDataSource = new MatTableDataSource(this.memberList);
      this.memberListDataSource.sort = this.sort;
      this.memberListDataSource.paginator = this.paginator;
      console.log(this.memberList);
      this.toggleTableRows();
    }, (error: any) => {
      console.log(error);
    });
  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);//converts a DOM TABLE element to a worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');

  }

  quickMemberSearch() {
    this.memberListDataSource.filter = this.searchValue.trim().toLowerCase();
  }

  toggleTableRows() {
    this.isTableExpanded = !this.isTableExpanded;
    this.memberListDataSource.data.forEach((row: any) => {
      row.isExpanded = this.isTableExpanded;
    })
  }

  public gotoMemebersDetails(url, id) {
    var myurl = `${url}/${id}`;
    this.router.navigateByUrl(myurl).then(e => {

    });
  }

}
