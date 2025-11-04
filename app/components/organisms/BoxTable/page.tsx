"use client";

import ColorBox from "@/app/components/atoms/ColorBox/page";
import { container } from "@/data/Container";
import { Box } from "@/data/domain/entities/Box";
import { BoxTransformer } from "@/data/transformers/BoxTransformer";
import { useEffect, useState } from "react";
import styles from "./style.module.css";

export default function BoxTable() {
  const [boxes, setBoxes] = useState<Box[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadBoxes = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const getBoxesUseCase = container.getGetBoxesUseCase();
      const loadedBoxes = await getBoxesUseCase.execute();
      setBoxes(loadedBoxes);
    } catch (err) {
      console.error("Error loading boxes:", err);
      setError("Failed to load boxes. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadBoxes();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading boxes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.error}>{error}</div>
        <button onClick={loadBoxes} className={styles.retryButton}>
          Retry
        </button>
      </div>
    );
  }

  if (boxes.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>Boxes List</h2>
        <div className={styles.empty}>No boxes found. Add your first box!</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Boxes List</h2>
      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Receiver Name</th>
              <th>Weight (kg)</th>
              <th>Box Colour</th>
              <th>Destination Country</th>
              <th>Shipping Cost</th>
            </tr>
          </thead>
          <tbody>
            {boxes.map((box) => (
              <tr key={box.id || Math.random()}>
                <td>{box.receiverName}</td>
                <td>{box.weight}</td>
                <td>
                  <div className={styles.colorCell}>
                    <ColorBox rgb={box.boxColor} />
                    <span className={styles.colorText}>{box.boxColor}</span>
                  </div>
                </td>
                <td>{box.destinationCountry}</td>
                <td className={styles.costCell}>
                  {BoxTransformer.formatCurrency(box.shippingCost || 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
