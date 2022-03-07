import { Component, Input } from '@angular/core';
import { BusinessReview } from 'src/app/models/business-review.model';

@Component({
  selector: 'app-review-list',
  templateUrl: './review-list.component.html',
  styleUrls: ['./review-list.component.css'],
})
export class ReviewListComponent {
  @Input() reviews: BusinessReview[] = [];

  constructor() {}

  openComment(review: BusinessReview) {
    window.open(review.url, '_blank');
  }
}
