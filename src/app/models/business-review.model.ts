import { ReviewUser } from './review-user.model';

export interface BusinessReviewsResponse {
  reviews: BusinessReview[];
}

export interface BusinessReview {
  id: string;
  rating: string;
  user: ReviewUser;
  text: string;
  time_created: string;
  url: string;
}
