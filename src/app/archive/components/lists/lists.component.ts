import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: [
    './styles/lists.component.scss',
    './styles/lists.responsive.scss'
  ]
})
export class ListsComponent implements OnInit {
  list1Users: Array<any>;
  list2Users: Array<any>;
  list3Articles: Array<any>;
  list4WishList: Array<any>;

  constructor(private route: ActivatedRoute) {
    // tslint:disable-next-line:no-string-literal
    this.list1Users = route.snapshot.data['data'].list1Users;
    // tslint:disable-next-line:no-string-literal
    this.list2Users = route.snapshot.data['data'].list2Users;
    // tslint:disable-next-line:no-string-literal
    this.list3Articles = route.snapshot.data['data'].list3Articles;
    // tslint:disable-next-line:no-string-literal
    this.list4WishList = route.snapshot.data['data'].list4WishList;
  }

  ngOnInit() {
  }

}
