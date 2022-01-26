import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { SearchType } from 'src/app/models/type.model';
import { BusinessActions } from 'src/app/state/business/business.actions';
import { BusinessSelectors } from 'src/app/state/business/business.selectors';
import { BusinessResult } from 'src/app/state/business/models/business-results.model';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css'],
})
export class SearchScreenComponent implements OnInit, OnDestroy {
  businessResults!: Map<string, BusinessResult>;
  subscription = new Subscription();

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

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .select(BusinessSelectors.results)
      .subscribe((results) => this.handleBusinessResults(results));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleBusinessResults(results: Map<string, BusinessResult>) {
    this.businessResults = results;
  }

  handleOnSearch(searchFormValue: any) {
    this.store.dispatch(
      new BusinessActions.SearchRequest({
        name: searchFormValue.name,
        term: searchFormValue?.types[0],
        location: searchFormValue?.location,
      })
    );
  }
}
