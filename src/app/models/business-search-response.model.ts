import { BusinessesModel } from './business.model';

export interface BusinessSearchResponse {
  businesses: BusinessesModel[];
  region: Region;
  total: number;
}

export interface Region {
  center: Center;
}

export interface Center {
  latitude: number;
  longitude: number;
}
