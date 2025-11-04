"use client";

import styles from "./style.module.css";

interface ColorBoxProps {
  rgb: string;
  size?: number;
}

export default function ColorBox({ rgb, size = 40 }: ColorBoxProps) {
  return (
    <div
      className={styles.colorBox}
      style={{
        backgroundColor: rgb ? `rgb(${rgb})` : "rgb(0, 0, 0)",
        width: `${size}px`,
        height: `${size}px`,
      }}
      title={`RGB: ${rgb}`}
    />
  );
}
