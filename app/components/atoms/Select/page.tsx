"use client";

import { SelectHTMLAttributes } from "react";
import styles from "./style.module.css";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options?: Array<{ value: string; label: string }>;
}

export default function Select({
  label,
  error,
  options = [],
  className,
  ...props
}: SelectProps) {
  return (
    <div className={styles.selectWrapper}>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}
      <select
        className={`${styles.select} ${error ? styles.selectError : ""} ${
          className || ""
        }`}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
