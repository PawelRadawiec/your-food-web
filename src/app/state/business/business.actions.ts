import { BusinessDetails } from 'src/app/models/business-details.model';
import { BusinessSearchResponse } from 'src/app/models/business-search-response.model';
import { BusinessParams } from './models/business-params.model';

export namespace BusinessActions {
  export class SearchMultiple {
    static readonly type = '[Business] SearchMultiple';

    constructor(public params: BusinessParams[]) {}
  }

  export class SearchRequest {
    static readonly type = '[Business] SearchRequest';

    constructor(public params: BusinessParams) {}
  }

  export class SearchResponse {
    static readonly type = '[Business] SearchResponse';

    constructor(
      public resluts: BusinessSearchResponse,
      public params: BusinessParams
    ) {}
  }

  export class CancelMultipleSearch {
    static readonly type = '[Business] CancelMultipleSearch';
  }

  export class GetById {
    static readonly type = '[Business]  GetById';

    constructor(public id: string) {}
  }

  export class GetByIdLoaded {
    static readonly type = '[Business]  GetByIdLoaded';

    constructor(public businessDetails: BusinessDetails) {}
  }
}
