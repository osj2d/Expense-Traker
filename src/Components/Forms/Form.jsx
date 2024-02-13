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
  const [ultimo, setUltimo] = useState(false);

  React.useEffect(() => {
    console.log(pagarList);
    if (pagarList.length != 0) {
      console.log("Opção 1:", pagarList);
      localStorage.setItem("contas", JSON.stringify(pagarList));
    } else if (localStorage.getItem("contas")) {
      setPagarList(JSON.parse(localStorage.getItem("contas")));
      console.log("Opção 2:", pagarList);
    }
    if (ultimo && pagarList != 0) {
      setPagarList([]);
      localStorage.removeItem("contas");
    }
  }, [pagarList, ultimo]);

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
    }
  }
  function handleClickPaga({ target }) {
    const changeDone = pagarList.map((info) => {
      if (info.id == target.value) {
        if (info.pago) {
          setContaFinal(Number(contaFinal) - Number(info.valor));
        } else {
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
    if (pagarList.length == 1) setUltimo(true);
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
      <button onClick={() => console.log(localStorage.getItem("contas"))}>
        Teste
      </button>
    </div>
  );
};

export default Form;
