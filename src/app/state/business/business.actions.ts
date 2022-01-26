import { BusinessSearchResponse } from 'src/app/models/business-search-response.model';
import { BusinessParams } from './models/business-params.model';

export namespace BusinessActions {
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
}
