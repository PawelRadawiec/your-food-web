import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { BusinessActions } from 'src/app/state/business/business.actions';
import { BusinessSelectors } from 'src/app/state/business/business.selectors';

@Component({
  selector: 'app-error-screen',
  templateUrl: './error-screen.component.html',
  styleUrls: ['./error-screen.component.css'],
})
export class ErrorScreenComponent implements OnInit, OnDestroy {
  errors: any = {};
  subscription = new Subscription();
  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.subscription.add(
      this.store.select(BusinessSelectors.requestError).subscribe((error) => {
        this.handleErrors(error);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new BusinessActions.ClearErrors());
  }

  handleErrors(errors: any) {
    this.errors = errors;
    if (!this.errors) {
      this.router.navigate(['search']);
    }
  }
}
