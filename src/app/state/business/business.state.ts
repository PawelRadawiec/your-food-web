import { Injectable } from '@angular/core';
import {
  Action,
  Actions,
  ofAction,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { forkJoin, from, mergeMap, of, takeLast, takeUntil } from 'rxjs';
import { BusinessService } from 'src/app/services/business.service';
import { BusinessActions } from './business.actions';
import { BusinessStateModel } from './models/business-state.model';
import * as _ from 'lodash';
import { BusinessResult } from './models/business-results.model';
import { BusinessesModel } from 'src/app/models/business.model';

@State<BusinessStateModel>({
  name: 'business',
  defaults: {
    detailsScreen: {},
    results: new Map(),
    searchLoading: false,
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
      })
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
      })
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
      })
    );
  }

  @Action(BusinessActions.DetailsDataLoaded)
  detailsLoaded(
    ctx: StateContext<BusinessStateModel>,
    action: BusinessActions.DetailsDataLoaded
  ) {
    ctx.patchState({
      detailsScreen: action.data,
    });
  }
}
