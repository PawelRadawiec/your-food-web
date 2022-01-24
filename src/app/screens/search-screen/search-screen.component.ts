import { Component, OnInit } from '@angular/core';
import { SearchType } from 'src/app/models/type.model';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css'],
})
export class SearchScreenComponent implements OnInit {
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

  ngOnInit() {}

  handleOnSearch(searchFormValue: any) {
    console.log('searchFormValue: ', searchFormValue);
  }
}
