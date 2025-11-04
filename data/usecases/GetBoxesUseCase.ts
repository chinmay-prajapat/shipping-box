import { Box } from "../domain/entities/Box";
import { IBoxRepository } from "../domain/interfaces/IBoxRepository";
import { IShippingCostCalculator } from "../domain/interfaces/IShippingCostCalculator";

export class GetBoxesUseCase {
  constructor(
    private boxRepository: IBoxRepository,
    private shippingCostCalculator: IShippingCostCalculator
  ) {}

  async execute(): Promise<Box[]> {
    const boxes = await this.boxRepository.findAll();

    return boxes.map((box) => ({
      ...box,
      shippingCost:
        box.shippingCost ??
        this.shippingCostCalculator.calculate(
          box.weight,
          box.destinationCountry
        ),
    }));
  }
}
