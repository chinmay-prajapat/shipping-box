import { Box } from "../domain/entities/Box";
import { IBoxRepository } from "../domain/interfaces/IBoxRepository";

export class BoxApiAdapter implements IBoxRepository {
  private baseUrl: string;

  constructor(baseUrl: string = "/api") {
    this.baseUrl = baseUrl;
  }

  async save(box: Box): Promise<Box> {
    const response = await fetch(`${this.baseUrl}/boxes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(box),
    });

    if (!response.ok) {
      throw new Error(`Failed to save box: ${response.statusText}`);
    }

    return await response.json();
  }

  async findAll(): Promise<Box[]> {
    const response = await fetch(`${this.baseUrl}/boxes`);

    if (!response.ok) {
      throw new Error(`Failed to fetch boxes: ${response.statusText}`);
    }

    return await response.json();
  }
}
