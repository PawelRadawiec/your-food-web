import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { BusinessReview } from 'src/app/models/business-review.model';
import { BusinessSelectors } from 'src/app/state/business/business.selectors';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent implements OnInit, OnDestroy {
  reviews: Partial<BusinessReview[]> = [];
  subscription = new Subscription();

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.select(BusinessSelectors.detailsScreen).subscribe((details) => {
      this.reviews = details.reviews ?? [];
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
