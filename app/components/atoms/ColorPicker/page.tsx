"use client";

import { InputHTMLAttributes } from "react";
import styles from "./style.module.css";

interface ColorPickerProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "value"> {
  label?: string;
  error?: string;
  value?: string; // RGB format: "255, 255, 255"
  hexValue?: string; // Hex format: "#ffffff"
  onRgbChange?: (rgb: string) => void;
  onHexChange?: (hex: string) => void;
}

export default function ColorPicker({
  label,
  error,
  value,
  hexValue,
  onRgbChange,
  onHexChange,
  ...props
}: ColorPickerProps) {
  return (
    <div className={styles.colorPickerWrapper}>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.colorPickerContainer}>
        <input
          type="color"
          value={hexValue || "#000000"}
          onChange={(e) => onHexChange?.(e.target.value)}
          className={`${styles.colorInput} ${
            error ? styles.colorInputError : ""
          }`}
          {...props}
        />
        <input
          type="text"
          value={value || ""}
          placeholder="RGB format: 255, 255, 255"
          onChange={(e) => onRgbChange?.(e.target.value)}
          className={`${styles.rgbInput} ${error ? styles.rgbInputError : ""}`}
        />
      </div>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
