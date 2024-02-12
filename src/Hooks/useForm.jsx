import React from "react";

const useForm = () => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  function validade(value) {
    if (value.trim().length === 0) {
      setError("Preencha um valor");
      return false;
    } else {
      setError(null);
      return true;
    }
  }
  function onChange({ target }) {
    if (error) validade(target.value);
    setValue(target.value);
  }

  return { value, setValue, onChange, error, validade: () => validade(value) };
};

export default useForm;
