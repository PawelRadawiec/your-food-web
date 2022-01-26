import { Injectable } from '@angular/core';
import { Action, State, StateContext, Store } from '@ngxs/store';
import { map } from 'rxjs';
import { BusinessService } from 'src/app/services/business.service';
import { BusinessActions } from './business.actions';
import { BusinessResult } from './models/business-results.model';
import { BusinessStateModel } from './models/business-state.model';
import * as _ from 'lodash';

@State<BusinessStateModel>({
  name: 'business',
  defaults: {
    results: new Map(),
    selected: null,
  },
})
@Injectable()
export class BusinessState {
  constructor(private store: Store, private businessService: BusinessService) {}

  @Action(BusinessActions.SearchRequest)
  searchRequest(
    ctx: StateContext<BusinessStateModel>,
    action: BusinessActions.SearchRequest
  ) {
    return this.businessService.search(action.params).pipe(
      map((results) => {
        return this.store.dispatch(
          new BusinessActions.SearchResponse(results, action.params)
        );
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
}
