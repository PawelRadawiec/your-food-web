import { BusinessDetails } from 'src/app/models/business-details.model';
import { BusinessResult } from './business-results.model';

export interface BusinessStateModel {
  details: Partial<BusinessDetails>;
  results: Map<string, BusinessResult>;
  searchLoading: boolean;
}
