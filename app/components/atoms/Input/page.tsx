"use client";

import { InputHTMLAttributes } from "react";
import styles from "./style.module.css";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className={styles.inputWrapper}>
      {label && (
        <label htmlFor={props.id} className={styles.label}>
          {label}
        </label>
      )}
      <input
        className={`${styles.input} ${error ? styles.inputError : ""} ${
          className || ""
        }`}
        {...props}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
