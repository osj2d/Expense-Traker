import React from "react";
import useForm from "../../Hooks/useForm";
import Input from "./input";

const Form = () => {
  const conta = useForm();
  const valor = useForm();
  const vencimento = useForm();

  function handleClick(event) {
    event.preventDefault();
    if (conta.validade() && valor.validade() && vencimento.validade()) {
      console.log('show')
    }
  }

  return (
    <div>
      <form action="">
        <Input label="Conta" type="Text" name="conta" {...conta} />
        <Input label="Valor" type="Text" name="valor" {...valor} />
        <Input
          label="Vencimento"
          type="Text"
          name="vencimento"
          {...vencimento}
        />
        <button onClick={handleClick}>Adicionar</button>
      </form>
    </div>
  );
};

export default Form;
