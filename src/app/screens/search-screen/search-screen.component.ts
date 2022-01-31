import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { BusinessResult } from 'src/app/models/business-results.model';
import { SearchType } from 'src/app/models/type.model';
import { BusinessService } from 'src/app/services/business.service';
import { BusinessActions } from 'src/app/state/business/business.actions';
import { BusinessSelectors } from 'src/app/state/business/business.selectors';

@Component({
  selector: 'app-search-screen',
  templateUrl: './search-screen.component.html',
  styleUrls: ['./search-screen.component.css'],
})
export class SearchScreenComponent implements OnInit, OnDestroy {
  businessResults!: Map<string, BusinessResult>;
  searchLoading!: boolean;
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

  constructor(private store: Store, private businessService: BusinessService) {}

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
    this.businessResults = results;
  }

  handleOnSearch(searchFormValue: any) {
    const types: string[] = searchFormValue?.types;
    const params = types?.map((type) => ({
      name: searchFormValue.name,
      term: type,
      location: searchFormValue?.location,
      sort_by: searchFormValue?.sortBy,
      price: searchFormValue?.price,
      open_now: searchFormValue?.openNow,
    }));
    if (this.searchLoading) {
      this.store.dispatch(new BusinessActions.CancelMultipleSearch());
    }
    if (params?.length > 0) {
      this.store.dispatch(new BusinessActions.SearchMultiple(params));
    }
  }
}
