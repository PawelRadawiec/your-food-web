import { PageEvent } from '@angular/material/paginator';
import { BusinessDetailsData } from 'src/app/models/business-details-data.model';
import { BusinessResult } from 'src/app/models/business-results.model';
import { BusinessSearchResponse } from 'src/app/models/business-search-response.model';
import { BusinessParams } from '../../models/business-params.model';

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

  export class GetDetailsData {
    static readonly type = '[Business] GetDetailsData';

    constructor(public id: string) {}
  }

  export class DetailsDataLoaded {
    static readonly type = '[Business] DetailsDataLoaded';
    constructor(public data: BusinessDetailsData) {}
  }

  export class RequestError {
    static readonly type = '[Business] RequestError';

    constructor(public error: any) {}
  }

  export class HandlePaginationEvent {
    static readonly type = '[Business] HandlePaginationEvent';
    constructor(public pageEvent: PageEvent, public params: BusinessParams) {}
  }

  export class BusinessPaginationNext {
    static readonly type = '[Business] BusinessPaginationNext';
    constructor(public params: BusinessParams) {}
  }

  export class BusinessPaginationBack {
    static readonly type = '[Business] BusinessPaginationBack';
    constructor(public type: string, public pageIndex: number) {}
  }

  export class ClearErrors {
    static readonly type = '[Business] ClearErrors';

    constructor() {}
  }
}
