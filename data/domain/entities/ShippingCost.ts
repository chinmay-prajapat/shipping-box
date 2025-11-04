import { DestinationCountry } from "../enums/DestinationCountry";

export interface ShippingCost {
  country: DestinationCountry;
  costPerBox: number;
}
