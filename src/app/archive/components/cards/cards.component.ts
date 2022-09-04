import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: [
    './styles/cards.component.scss',
    './styles/cards.responsive.scss'
  ]
})
export class CardsComponent implements OnInit {
  card1Users: Array<any>;
  card2Users: Array<any>;
  card3Products: Array<any>;
  card4Products: Array<any>;
  card5Products: Array<any>;
  card6Users: Array<any>;
  card7Articles: Array<any>;

  constructor(private route: ActivatedRoute) {
    // tslint:disable-next-line:no-string-literal
    this.card1Users = route.snapshot.data['data'].card1Users;
    // tslint:disable-next-line:no-string-literal
    this.card2Users = route.snapshot.data['data'].card2Users;
    // tslint:disable-next-line:no-string-literal
    this.card3Products = route.snapshot.data['data'].card3Products;
    // tslint:disable-next-line:no-string-literal
    this.card4Products = route.snapshot.data['data'].card4Products;
    // tslint:disable-next-line:no-string-literal
    this.card5Products = route.snapshot.data['data'].card5Products;
    // tslint:disable-next-line:no-string-literal
    this.card6Users = route.snapshot.data['data'].card6Users;
    // tslint:disable-next-line:no-string-literal
    this.card7Articles = route.snapshot.data['data'].card7Articles;
  }

  ngOnInit() {}

}
