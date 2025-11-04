import { Box } from "../domain/entities/Box";
import { DestinationCountry } from "../domain/enums/DestinationCountry";
import { IBoxRepository } from "../domain/interfaces/IBoxRepository";
import { IShippingCostCalculator } from "../domain/interfaces/IShippingCostCalculator";

export interface AddBoxUseCaseInput {
  receiverName: string;
  weight: number;
  boxColor: string;
  destinationCountry: DestinationCountry;
}

export class AddBoxUseCase {
  constructor(
    private boxRepository: IBoxRepository,
    private shippingCostCalculator: IShippingCostCalculator
  ) {}

  async execute(input: AddBoxUseCaseInput): Promise<Box> {
    const weight = Math.max(0, input.weight);

    const box: Box = {
      receiverName: input.receiverName,
      weight,
      boxColor: input.boxColor,
      destinationCountry: input.destinationCountry,
      shippingCost: this.shippingCostCalculator.calculate(
        weight,
        input.destinationCountry
      ),
    };

    return await this.boxRepository.save(box);
  }
}
