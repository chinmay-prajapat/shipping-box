import { BoxApiAdapter } from "../adapters/BoxApiAdapter";
import { IBoxRepository } from "../domain/interfaces/IBoxRepository";
import { IShippingCostCalculator } from "../domain/interfaces/IShippingCostCalculator";
import { ShippingCostCalculator } from "../domain/services/ShippingCostCalculator";
import { AddBoxUseCase } from "../usecases/AddBoxUseCase";
import { GetBoxesUseCase } from "../usecases/GetBoxesUseCase";

export class Container {
  private boxRepository: IBoxRepository;
  private shippingCostCalculator: IShippingCostCalculator;
  private addBoxUseCase: AddBoxUseCase;
  private getBoxesUseCase: GetBoxesUseCase;

  constructor() {
    this.boxRepository = new BoxApiAdapter();

    this.shippingCostCalculator = new ShippingCostCalculator();

    this.addBoxUseCase = new AddBoxUseCase(
      this.boxRepository,
      this.shippingCostCalculator
    );
    this.getBoxesUseCase = new GetBoxesUseCase(
      this.boxRepository,
      this.shippingCostCalculator
    );
  }

  getAddBoxUseCase(): AddBoxUseCase {
    return this.addBoxUseCase;
  }

  getGetBoxesUseCase(): GetBoxesUseCase {
    return this.getBoxesUseCase;
  }
}

// Singleton instance
export const container = new Container();
