import { Category } from './category.model';
import { Coordinates } from './coordinates.model';

export interface BusinessDetails {
  id: string;
  alias: string;
  name: string;
  image_url: string;
  is_claimed: string;
  is_closed: string;
  url: string;
  phone: string;
  display_phone: string;
  review_count: string;
  categories: Category[];
  rating: string | number;
  location: Location;
  coordinates: Coordinates;
  photos: string[];
  price: string;
  hours: BusinessHour[];
  transactions: [];
  special_hours: [];
}

export interface Location {
  city: string;
  country: string;
  address1: string;
  address2: string;
  address3: string;
  state: string;
  zip_code: string;
  display_address: string[];
}

export interface BusinessHour {
  hours_type: string;
  is_open_now: boolean;
  open: BusinessDayDetails[];
}

export interface BusinessDayDetails {
  day: number;
  end: string;
  is_overnight: boolean;
  start: string;
}
