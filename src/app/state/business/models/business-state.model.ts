import { BusinessesModel } from "src/app/models/business.model";
import { BusinessResult } from "./business-results.model";

export interface BusinessStateModel {
  results: Map<string, BusinessResult>;
  selected: BusinessesModel | null;
  searchLoading: boolean;
}
