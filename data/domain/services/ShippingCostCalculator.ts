import { DestinationCountry } from "../enums/DestinationCountry";
import { IShippingCostCalculator } from "../interfaces/IShippingCostCalculator";
import { SHIPPING_COST_MAPPING } from "../mappings/ShippingCostMapping";

export class ShippingCostCalculator implements IShippingCostCalculator {
  calculate(weight: number, country: DestinationCountry): number {
    const costPerBox = this.getCostPerBox(country);
    return weight * costPerBox;
  }

  getCostPerBox(country: DestinationCountry): number {
    return SHIPPING_COST_MAPPING[country].costPerBox;
  }
}
