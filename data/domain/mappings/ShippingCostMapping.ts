import { ShippingCost } from "../entities/ShippingCost";
import { DestinationCountry } from "../enums/DestinationCountry";

export const SHIPPING_COST_MAPPING: Record<DestinationCountry, ShippingCost> = {
  [DestinationCountry.SWEDEN]: {
    country: DestinationCountry.SWEDEN,
    costPerBox: 7.35,
  },
  [DestinationCountry.CHINA]: {
    country: DestinationCountry.CHINA,
    costPerBox: 11.53,
  },
  [DestinationCountry.BRAZIL]: {
    country: DestinationCountry.BRAZIL,
    costPerBox: 15.63,
  },
  [DestinationCountry.AUSTRALIA]: {
    country: DestinationCountry.AUSTRALIA,
    costPerBox: 50.09,
  },
};
