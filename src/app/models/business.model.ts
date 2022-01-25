import { Category } from './category.model';
import { Coordinates } from './coordinates.model';

export interface BusinessesModel {
  rating: number;
  price: string;
  phone: string;
  id: string;
  alias: string;
  is_closed: boolean;
  categories: Category[];
  review_count: number;
  name: string;
  url: string;
  coordinates: Coordinates[];
  image_url: string;
  location: Location;
  distance: number;
  transactions: string[];
}
