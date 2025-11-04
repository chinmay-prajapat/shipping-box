import { Box } from "../entities/Box";

export interface IBoxRepository {
  save(box: Box): Promise<Box>;
  findAll(): Promise<Box[]>;
}
