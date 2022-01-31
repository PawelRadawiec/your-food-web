import { Selector } from '@ngxs/store';
import { BusinessStateModel } from 'src/app/models/business-state.model';
import { BusinessState } from './business.state';


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
  static detailsScreen(state: BusinessStateModel) {
    return state.detailsScreen;
  }

  @Selector([BusinessState])
  static requestError(state: BusinessStateModel) {
    return state.errors;
  }

  @Selector([BusinessState])
  static selectedPending(state: BusinessStateModel) {
    return state.selectedBusinessPending;
  }
}
