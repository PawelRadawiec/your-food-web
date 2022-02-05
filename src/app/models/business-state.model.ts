import { BusinessScreenDetails } from 'src/app/models/business-screen-details.model';
import { SelectedBusinessPending } from 'src/app/models/selected-business-pending.model';
import { BusinessResult } from './business-results.model';


export interface BusinessStateModel {
  detailsScreen: Partial<BusinessScreenDetails>;
  selectedBusinessPending: Partial<SelectedBusinessPending>;
  results: Map<string, BusinessResult>;
  searchLoading: boolean;
  errors: any;
}
