import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BusinessDetails } from '../models/business-details.model';
import { BusinessSearchResponse } from '../models/business-search-response.model';
import { BusinessParams } from '../state/business/models/business-params.model';

@Injectable({
  providedIn: 'root',
})
export class BusinessService {
  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  search(params: BusinessParams) {
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
