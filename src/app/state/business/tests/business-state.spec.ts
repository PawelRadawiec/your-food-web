import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { PageEvent } from '@angular/material/paginator';
import { Actions, NgxsModule, ofActionDispatched, Store } from '@ngxs/store';
import { Observable, of, take } from 'rxjs';
import { BusinessDetails } from 'src/app/models/business-details.model';
import { BusinessParams } from 'src/app/models/business-params.model';
import { BusinessReviewsResponse } from 'src/app/models/business-review.model';
import { BusinessSearchResponse } from 'src/app/models/business-search-response.model';
import { BusinessService } from 'src/app/services/business.service';
import { BusinessActions } from '../business.actions';
import { BusinessState } from '../business.state';

describe('Business State', () => {
  let actions$: Observable<any>;
  let store: Store;
  let businessService: BusinessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NgxsModule.forRoot([BusinessState])],
    });
    actions$ = TestBed.inject(Actions);
    store = TestBed.inject(Store);
    businessService = TestBed.inject(BusinessService);
    store.reset({
      business: {
        detailsScreen: {},
        results: new Map(),
        searchLoading: false,
        errors: null,
        selectedBusinessPending: {},
      },
    });
    const businessSearchResponse: BusinessSearchResponse = {
      businesses: [],
      region: {
        center: {
          latitude: 100,
          longitude: 100,
        },
      },
      total: 100,
    };
    spyOn(businessService, 'search').and.returnValue(
      of(businessSearchResponse)
    );
  });

  it('should call and load businesses three times [SearchMultiple]', () => {
    const params: BusinessParams[] = [
      {
        location: 'San Diego',
        offset: 2,
        name: 'Pizza',
        term: 'Pizza',
      },
      {
        location: 'San Diego',
        offset: 2,
        name: 'Burger',
        term: 'Burger',
      },
      {
        location: 'San Diego',
        offset: 2,
        name: 'Sushi',
        term: 'Sushi',
      },
    ];
    store.dispatch(new BusinessActions.SearchMultiple(params));
    const results = store.selectSnapshot((state) => state.business.results);
    expect(results.size).toBe(3);
    expect(businessService.search).toHaveBeenCalledTimes(3);
  });

  it('should call and load business once [SearchRequest]', () => {
    store.dispatch(
      new BusinessActions.SearchRequest({
        location: 'San Diego',
        offset: 2,
        name: 'Pizza',
        term: 'Pizza',
      })
    );
    const results = store.selectSnapshot((state) => state.business.results);
    expect(results.size).toBe(1);
    expect(businessService.search).toHaveBeenCalledTimes(1);
  });

  it('should get business details and reviews [GetDetailsData]', () => {
    const businessDetails: Partial<BusinessDetails> = {};
    const businessReviewsResponse: Partial<BusinessReviewsResponse> = {};
    spyOn(businessService, 'getById').and.returnValue(
      of(businessDetails as BusinessDetails)
    );
    spyOn(businessService, 'reviews').and.returnValue(
      of(businessReviewsResponse as BusinessReviewsResponse)
    );
    store.dispatch(new BusinessActions.GetDetailsData('12'));
    expect(businessService.getById).toHaveBeenCalledTimes(1);
    expect(businessService.reviews).toHaveBeenCalledTimes(1);
  });

  it('should call BusinessPaginationNext ', (done) => {
    actions$
      .pipe(ofActionDispatched(BusinessActions.BusinessPaginationNext), take(1))
      .subscribe((action) => {
        expect(action.constructor.name).toBe('BusinessPaginationNext');
        expect(businessService.search).toHaveBeenCalledTimes(1);
        done();
      });
    const pageEvent: PageEvent = {
      length: 0,
      pageIndex: 1,
      pageSize: 0,
      previousPageIndex: 0,
    };
    const param = {
      location: 'San Diego',
      offset: 0,
      name: 'Pizza',
      term: 'Pizza',
    };
    store.dispatch(new BusinessActions.HandlePaginationEvent(pageEvent, param));
  });

  it('should call BusinessPaginationBack ', (done) => {
    actions$
      .pipe(ofActionDispatched(BusinessActions.BusinessPaginationBack), take(1))
      .subscribe((action) => {
        expect(action.constructor.name).toBe('BusinessPaginationBack');
        done();
      });
    const pageEvent: PageEvent = {
      length: 0,
      pageIndex: 1,
      pageSize: 0,
      previousPageIndex: 0,
    };
    const param = {
      location: 'San Diego',
      offset: 0,
      name: 'Pizza',
      term: 'Pizza',
      pageIndex: 2,
    };
    store.dispatch(new BusinessActions.HandlePaginationEvent(pageEvent, param));
  });
});
