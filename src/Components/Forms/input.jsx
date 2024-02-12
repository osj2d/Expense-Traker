import React from "react";

const input = ({ label, name, type, value, onChange, error }) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} />
      {error && <p>{error}</p>}
    </div>
  );
};

export default input;
