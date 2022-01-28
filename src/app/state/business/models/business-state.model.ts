import { BusinessDetails } from 'src/app/models/business-details.model';
import { BusinessReview } from 'src/app/models/business-review.model';
import { BusinessResult } from './business-results.model';

export interface BusinessScreenDetails {
  businessDetails: Partial<BusinessDetails>;
  reviews: Partial<BusinessReview[]>;
}

export interface BusinessStateModel {
  detailsScreen: Partial<BusinessScreenDetails>;
  results: Map<string, BusinessResult>;
  searchLoading: boolean;
}
