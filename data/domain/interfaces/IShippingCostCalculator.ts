import { DestinationCountry } from "../enums/DestinationCountry";

export interface IShippingCostCalculator {
  calculate(weight: number, country: DestinationCountry): number;
  getCostPerBox(country: DestinationCountry): number;
}
