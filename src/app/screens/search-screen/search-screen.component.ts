import { Component, OnInit } from '@angular/core';
import { BusinessesModel } from 'src/app/models/business.model';
import { SearchType } from 'src/app/models/type.model';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css'],
})
export class SearchScreenComponent implements OnInit {
  businesses: BusinessesModel[] = [];

  types: SearchType[] = [
    {
      name: 'Pizza',
      value: 'pizza',
    },
    {
      name: 'Sushi',
      value: 'sushi',
    },
    {
      name: 'Burger',
      value: 'burger',
    },
    {
      name: 'Pasta',
      value: 'pasta',
    },
    {
      name: 'Steak',
      value: 'steak',
    },
    {
      name: 'Meat',
      value: 'meat',
    },
    {
      name: 'Beer',
      value: 'beer',
    },
    {
      name: 'Wine',
      value: 'wine',
    },
  ];

  constructor() {}

  ngOnInit() {
    this.initMockBusinesses();
  }

  initMockBusinesses() {
    const business: Partial<BusinessesModel> = { name: 'Test' };
    for (let i = 0; i <= 6; i++) {
      this.businesses.push(business as BusinessesModel);
    }
  }

  handleOnSearch(searchFormValue: any) {
    console.log('searchFormValue: ', searchFormValue);
  }
}
