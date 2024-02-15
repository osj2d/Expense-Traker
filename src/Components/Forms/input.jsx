import React from "react";
import styles from "./Input.module.css";

const Input = ({ label, name, type, value, onChange, error }) => {
  return (
    <div>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <input
        className={styles.input}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
