import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessDetails } from '../models/business-details.model';
import { BusinessReviewsResponse } from '../models/business-review.model';
import { BusinessSearchResponse } from '../models/business-search-response.model';
import { BusinessParams } from '../models/business-params.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  search(params: BusinessParams) {
    console.log('http: ', this.http);
    return this.http.get<BusinessSearchResponse>(
      `${this.baseUrl}/businesses/search`,
      {
        params: this.getHttpParams(params),
      }
    );
  }

  getById(id: string) {
    return this.http.get<BusinessDetails>(`${this.baseUrl}/businesses/${id}`);
  }

  reviews(businessId: string) {
    return this.http.get<BusinessReviewsResponse>(
      `${this.baseUrl}/businesses/${businessId}/reviews`
    );
  }

  private getHttpParams(params: BusinessParams) {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        httpParams = httpParams.append(key, value);
      }
    });
    return httpParams;
  }
}
