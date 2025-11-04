import { DestinationCountry } from "../enums/DestinationCountry";

export interface Box {
  id?: string;
  receiverName: string;
  weight: number; // in kilograms
  boxColor: string; // RGB format: "255, 255, 255"
  destinationCountry: DestinationCountry;
  shippingCost?: number; // in INR
}
