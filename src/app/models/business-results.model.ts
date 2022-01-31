import { BusinessesModel } from "src/app/models/business.model";
import { BusinessParams } from "./business-params.model";

export interface BusinessResult {
  params: BusinessParams;
  businesses: BusinessesModel[];
}
