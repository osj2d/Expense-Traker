import React, { useState } from "react";
import useForm from "../../Hooks/useForm";
import Input from "./Input";
import styles from "./Form.module.css";

const Form = () => {
  const conta = useForm();
  const valor = useForm();
  const vencimento = useForm();
  const renda = useForm();
  const [contaFinal, setContaFinal] = useState(0);
  const [pagarList, setPagarList] = useState([]);
  const [id, setId] = useState(0);

  React.useEffect(() => {
    let token = localStorage.getItem("contas");
    if (token) {
      token = JSON.parse(token);
      setPagarList(token);
    }
  }, []);

  function atualizarLocalStorage(pagarList) {
    console.log("Atualizar");
    console.log(pagarList);
    localStorage.setItem("contas", "");
    localStorage.setItem("contas", JSON.stringify(pagarList));
    return true;
  }

  function handleClick(event) {
    event.preventDefault();
    if (conta.validade() && valor.validade() && vencimento.validade()) {
      setId((prev) => (prev += 1));
      setPagarList((prev) => [
        ...prev,
        {
          id: id,
          conta: conta.value,
          valor: valor.value,
          vencimento: vencimento.value,
          pago: false,
        },
      ]);
      conta.limpar();
      valor.limpar();
      vencimento.limpar();
      renda.limpar();
      console.log(pagarList);
      atualizarLocalStorage(pagarList);
    }
  }
  function handleClickPaga({ target }) {
    const changeDone = pagarList.map((info) => {
      if (info.id == target.value) {
        if (info.pago) {
          setContaFinal(Number(contaFinal) - Number(info.valor));
        } else {
          console.log(info.valor);
          setContaFinal(Number(contaFinal) + Number(info.valor));
        }
        return { ...info, pago: !info.pago };
      }
      return info;
    });
    setPagarList(changeDone);
  }
  function handleDeleteConta({ target }) {
    setPagarList((current) =>
      current.filter((pagarList) => {
        return pagarList.id != target.value;
      })
    );
    atualizarLocalStorage(pagarList);
  }
  return (
    <div>
      <h1 className={styles.titulo}>Expense Traker</h1>
      <form className={styles.form} action="">
        <Input label="Renda:" type="number" name="renda" {...renda} />
        <div className={styles.conta}>
          <Input label="Conta:" type="text" name="conta" {...conta} />
          <Input label="Valor:" type="number" name="valor" {...valor} />
          <Input
            label="Vencimento:"
            type="Text"
            name="vencimento"
            {...vencimento}
          />
        </div>
        <button className="btn" onClick={handleClick}>
          Adicionar
        </button>
        <p>Valores gastos no mês: {contaFinal}</p>
      </form>
      <div className={styles.contas}>
        {pagarList.map(({ id, conta, valor, vencimento, pago }) => (
          <div className={pago ? styles.pago : ""} key={id}>
            <h2>{conta}</h2>
            <p>R$: {valor}</p>
            <p>Vencimento: {vencimento}</p>
            <div className={styles.btns}>
              <button className="btn" value={id} onClick={handleClickPaga}>
                {pago ? "Pago" : "Pagar"}
              </button>
              <button className="btn" value={id} onClick={handleDeleteConta}>
                Deletar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Form;
