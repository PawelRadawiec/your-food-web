import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { BusinessParams } from 'src/app/models/business-params.model';
import { BusinessResult } from 'src/app/models/business-results.model';
import { SearchType } from 'src/app/models/type.model';
import { BusinessActions } from 'src/app/state/business/business.actions';
import { BusinessSelectors } from 'src/app/state/business/business.selectors';
import * as _ from 'lodash';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css'],
})
export class SearchScreenComponent implements OnInit, OnDestroy {
  @Select(BusinessSelectors.searchLoading) searchLoading$!: Observable<boolean>;
  businessResults!: Map<string, BusinessResult>;
  searchLoading!: boolean;
  subscription = new Subscription();

  pageSize = 6;

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

  sortBy: SearchType[] = [
    {
      name: 'Best match',
      value: 'best_match',
    },
    {
      name: 'Rating',
      value: 'rating',
    },
    {
      name: 'Review count',
      value: 'review_count',
    },
    {
      name: 'Distance',
      value: 'distance',
    },
  ];

  prices: SearchType[] = [
    {
      name: '$',
      value: '1',
    },
    {
      name: '$$',
      value: '2',
    },
    {
      name: '$$$',
      value: '3',
    },
    {
      name: '$$$$',
      value: '4',
    },
  ];

  constructor(private store: Store) {}

  ngOnInit() {
    this.subscription.add(
      this.store
        .select(BusinessSelectors.results)
        .subscribe((results) => this.handleBusinessResults(results))
    );
    this.subscription.add(
      this.store
        .select(BusinessSelectors.searchLoading)
        .subscribe((searchLoading) => {
          this.searchLoading = searchLoading;
        })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  handleBusinessResults(results: Map<string, BusinessResult>) {
    this.businessResults = _.cloneDeep(results);
  }

  handleOnSearch(searchFormValue: any) {
    const params = this.createParams(searchFormValue?.types, searchFormValue);
    if (this.searchLoading) {
      this.store.dispatch(new BusinessActions.CancelMultipleSearch());
    }
    if (params?.length > 0) {
      this.store.dispatch(new BusinessActions.SearchMultiple(params));
    }
  }

  pageHandle(event: PageEvent, params: BusinessParams) {
    this.store.dispatch(
      new BusinessActions.HandlePaginationEvent(event, params)
    );
  }

  createParams(types: string[], searchFormValue: any) {
    return types?.map((type) => ({
      name: searchFormValue.name,
      term: type,
      location: searchFormValue?.location,
      sort_by: searchFormValue?.sortBy,
      price: searchFormValue?.price,
      open_now: searchFormValue?.openNow,
      offset: 6,
      limit: 6,
      pageIndex: 0,
    }));
  }

  trackByFn(index: any, item: BusinessResult) {
    return item.params.term;
  }
}
