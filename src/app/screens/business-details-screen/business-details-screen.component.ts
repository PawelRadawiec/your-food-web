import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { BusinessDetails } from 'src/app/models/business-details.model';
import { BusinessSelectors } from 'src/app/state/business/business.selectors';
import * as _ from 'lodash';

@Component({
  selector: 'app-business-details-screen',
  templateUrl: './business-details-screen.component.html',
  styleUrls: ['./business-details-screen.component.css'],
})
export class BusinessDetailsScreenComponent implements OnInit, OnDestroy {
  businessDetails!: Partial<BusinessDetails>;
  subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.subscription.add(
      this.store.select(BusinessSelectors.details).subscribe((details) => {
        this.businessDetails = _.cloneDeep(details);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
