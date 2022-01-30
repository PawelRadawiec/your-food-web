import { Injectable } from '@angular/core';
import {
  Action,
  Actions,
  ofAction,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import * as _ from 'lodash';
import {
  catchError,
  forkJoin,
  from,
  mergeMap,
  of,
  takeLast,
  takeUntil,
} from 'rxjs';
import { BusinessService } from 'src/app/services/business.service';
import { BusinessActions } from './business.actions';
import { BusinessResult } from './models/business-results.model';
import { BusinessStateModel } from './models/business-state.model';

@State<BusinessStateModel>({
  name: 'business',
  defaults: {
    detailsScreen: {},
    results: new Map(),
    searchLoading: false,
    errors: null,
    selectedBusinessPending: {},
  },
})
@Injectable()
export class BusinessState {
  constructor(
    private store: Store,
    private businessService: BusinessService,
    private action$: Actions
  ) {}

  @Action(BusinessActions.SearchRequest)
  searchRequest(
    ctx: StateContext<BusinessStateModel>,
    action: BusinessActions.SearchRequest
  ) {
    return this.businessService.search(action.params).pipe(
      mergeMap((results) => {
        return this.store.dispatch(
          new BusinessActions.SearchResponse(results, action.params)
        );
      }),
      catchError((error) =>
        this.store.dispatch(new BusinessActions.RequestError(error))
      )
    );
  }

  @Action(BusinessActions.SearchMultiple)
  searchMultiple(
    ctx: StateContext<BusinessStateModel>,
    action: BusinessActions.SearchMultiple
  ) {
    ctx.patchState({
      searchLoading: true,
    });
    return from(action.params).pipe(
      mergeMap((params) => {
        return this.businessService.search(params).pipe(
          mergeMap((response) => {
            return this.store.dispatch(
              new BusinessActions.SearchResponse(response, params)
            );
          })
        );
      }),
      takeUntil(
        this.action$.pipe(ofAction(BusinessActions.CancelMultipleSearch))
      ),
      takeLast(1),
      mergeMap(() => {
        if (ctx.getState().results.size > 0) {
          const resultMapCopy = ctx.getState().results;
          const results = new Map<string, BusinessResult>();
          action.params.forEach((param) => {
            results.set(param.term, resultMapCopy.get(param.term)!);
          });
          ctx.patchState({
            results,
          });
        }
        ctx.patchState({
          searchLoading: false,
        });
        return of();
      }),
      catchError((error) =>
        this.store.dispatch(new BusinessActions.RequestError(error))
      )
    );
  }

  @Action(BusinessActions.SearchResponse)
  searchResponse(
    ctx: StateContext<BusinessStateModel>,
    action: BusinessActions.SearchResponse
  ) {
    const results = _.cloneDeep(ctx.getState().results);
    const businessResult = {
      params: action.params,
      businesses: action.resluts.businesses,
    };
    results.set(action.params.term, businessResult);
    ctx.patchState({
      results,
    });
  }

  @Action(BusinessActions.GetDetailsData)
  getBusinessDetailsData(
    ctx: StateContext<BusinessStateModel>,
    action: BusinessActions.GetDetailsData
  ) {
    const { id } = action;
    ctx.patchState({
      selectedBusinessPending: { id, pending: true },
    });
    const businessDetails$ = this.businessService.getById(id);
    const businessReviews$ = this.businessService.reviews(id);
    return forkJoin([businessDetails$, businessReviews$]).pipe(
      mergeMap(([businessDetails, businessReviews]) => {
        return this.store.dispatch(
          new BusinessActions.DetailsDataLoaded({
            reviews: businessReviews.reviews,
            businessDetails,
          })
        );
      }),
      catchError((error) =>
        this.store.dispatch(new BusinessActions.RequestError(error))
      )
    );
  }

  @Action(BusinessActions.DetailsDataLoaded)
  detailsLoaded(
    ctx: StateContext<BusinessStateModel>,
    action: BusinessActions.DetailsDataLoaded
  ) {
    ctx.patchState({
      detailsScreen: action.data,
      selectedBusinessPending: {},
    });
  }

  @Action(BusinessActions.RequestError)
  requestError(
    ctx: StateContext<BusinessStateModel>,
    action: BusinessActions.RequestError
  ) {
    ctx.patchState({
      errors: action.error,
      selectedBusinessPending: {},
      searchLoading: false,
    });
  }

  @Action(BusinessActions.ClearErrors)
  clearErrors(ctx: StateContext<BusinessStateModel>) {
    ctx.patchState({
      errors: null,
    });
  }
}
