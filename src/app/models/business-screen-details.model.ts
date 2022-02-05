import { BusinessDetails } from "./business-details.model";
import { BusinessReview } from "./business-review.model";

export interface BusinessScreenDetails {
  businessDetails: Partial<BusinessDetails>;
  reviews: Partial<BusinessReview[]>;
}
