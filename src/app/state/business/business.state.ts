import { Injectable } from '@angular/core';
import {
  Action,
  Actions,
  ofAction,
  State,
  StateContext,
  Store,
} from '@ngxs/store';
import { from, map, mergeMap, of, takeLast, takeUntil } from 'rxjs';
import { BusinessService } from 'src/app/services/business.service';
import { BusinessActions } from './business.actions';
import { BusinessStateModel } from './models/business-state.model';
import * as _ from 'lodash';
import { tap } from 'lodash';

@State<BusinessStateModel>({
  name: 'business',
  defaults: {
    results: new Map(),
    selected: null,
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
    return from(action.params).pipe(
      mergeMap((params) => {
        ctx.patchState({
          searchLoading: true,
        });
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
      searchLoading: false,
    });
  }
}
