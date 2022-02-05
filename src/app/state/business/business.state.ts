import { Xtb } from '@angular/compiler';
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
import { reject } from 'lodash';
import {
  catchError,
  forkJoin,
  from,
  mergeMap,
  of,
  takeLast,
  takeUntil,
} from 'rxjs';
import { BusinessResult } from 'src/app/models/business-results.model';
import { BusinessStateModel } from 'src/app/models/business-state.model';
import { BusinessesModel } from 'src/app/models/business.model';
import { BusinessService } from 'src/app/services/business.service';
import { BusinessActions } from './business.actions';

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
    const term = action.params.term;
    const results = _.cloneDeep(ctx.getState().results);
    let pageIndexBusinesses = results.get(term)?.businessesByPageIndex;
    if (!pageIndexBusinesses) {
      pageIndexBusinesses = new Map<number, BusinessesModel[]>();
    }
    pageIndexBusinesses.set(
      action.params.pageIndex!,
      action.resluts.businesses
    );
    const businessResult = {
      params: action.params,
      businesses: action.resluts.businesses,
      total: action.resluts.total,
      businessesByPageIndex: pageIndexBusinesses,
    };
    results.set(term, businessResult);
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

  @Action(BusinessActions.HandlePaginationEvent)
  handlePageEvent(
    _: StateContext<BusinessStateModel>,
    action: BusinessActions.HandlePaginationEvent
  ) {
    const { pageEvent, params } = action;
    const currentPageIndex = pageEvent.pageIndex;
    const paramsPageIndex = params.pageIndex;
    if (paramsPageIndex && currentPageIndex < paramsPageIndex) {
      this.store.dispatch(
        new BusinessActions.BusinessPaginationBack(
          params.term,
          pageEvent.pageIndex
        )
      );
    } else {
      params.offset += 6;
      params.pageIndex = pageEvent.pageIndex;
      this.store.dispatch(new BusinessActions.BusinessPaginationNext(params));
    }
  }

  @Action(BusinessActions.BusinessPaginationNext)
  businessPaginationNext(
    ctx: StateContext<BusinessStateModel>,
    action: BusinessActions.BusinessPaginationNext
  ) {
    ctx.patchState({ searchLoading: true });
    return this.businessService.search(action.params).pipe(
      mergeMap((response) => {
        ctx.patchState({
          searchLoading: false,
        });
        return this.store.dispatch(
          new BusinessActions.SearchResponse(response, action.params)
        );
      }),
      catchError((reject) =>
        this.store.dispatch(new BusinessActions.RequestError(reject))
      )
    );
  }

  @Action(BusinessActions.BusinessPaginationBack)
  setBusinessesByPageIndex(
    ctx: StateContext<BusinessStateModel>,
    action: BusinessActions.BusinessPaginationBack
  ) {
    const { pageIndex, type } = action;
    const results = _.cloneDeep(ctx.getState().results);
    const businessResult = results.get(type);
    const businessesByPageIndex =
      businessResult?.businessesByPageIndex.get(pageIndex);
    if (businessesByPageIndex && businessResult) {
      businessResult.params.pageIndex = pageIndex;
      businessResult.params.offset -= 6;
      businessResult.businesses = businessesByPageIndex;
      results.set(action.type, businessResult);
      ctx.patchState({
        results,
      });
    }
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
