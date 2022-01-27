import { Selector } from '@ngxs/store';
import { BusinessState } from './business.state';
import { BusinessStateModel } from './models/business-state.model';

export class BusinessSelectors {
  @Selector([BusinessState])
  static results(state: BusinessStateModel) {
    return state.results;
  }

  @Selector([BusinessState])
  static searchLoading(state: BusinessStateModel) {
    return state.searchLoading;
  }

  @Selector([BusinessState])
  static details(state: BusinessStateModel) {
    return state.details;
  }
}
