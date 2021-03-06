import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Observable, race, first, tap } from 'rxjs';
import { BusinessActions } from '../state/business/business.actions';

@Injectable()
export class BusinessDetailsResolver implements Resolve<any> {
  constructor(
    private store: Store,
    private actions$: Actions,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const responseOK = this.actions$.pipe(
      ofActionDispatched(BusinessActions.DetailsDataLoaded)
    );
    const repsonseError = this.actions$.pipe(
      ofActionDispatched(BusinessActions.RequestError),
      tap(() => {
        this.router.navigate(['error']);
      })
    );
    const { id } = route.params;
    this.store.dispatch(new BusinessActions.GetDetailsData(id));
    // todo - handle error
    return race(responseOK, repsonseError).pipe(first());
  }
}
