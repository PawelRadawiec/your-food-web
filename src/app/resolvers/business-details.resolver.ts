import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Actions, ofActionDispatched, Store } from '@ngxs/store';
import { Observable, race, first } from 'rxjs';
import { BusinessActions } from '../state/business/business.actions';

@Injectable()
export class BusinessDetailsResolver implements Resolve<any> {
  constructor(private store: Store, private actions$: Actions) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const responseOK = this.actions$.pipe(
      ofActionDispatched(BusinessActions.GetByIdLoaded)
    );
    const { id } = route.params;
    this.store.dispatch(new BusinessActions.GetById(id));
    // todo - handle error
    return race(responseOK).pipe(first());
  }
}
