import { BusinessDetails } from './business-details.model';
import { BusinessReview } from './business-review.model';

export interface BusinessDetailsData {
  reviews: BusinessReview[];
  businessDetails: BusinessDetails;
}
