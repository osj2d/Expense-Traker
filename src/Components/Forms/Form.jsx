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
    if (pagarList.length != 0) {
      localStorage.setItem("contas", JSON.stringify(pagarList));
      setUltimo(false);
    } else if (localStorage.getItem("contas")) {
      let idStorage = JSON.parse(localStorage.getItem("contas"));
      setId(idStorage.slice(-1)[0]["id"] + 1);
      setPagarList(JSON.parse(localStorage.getItem("contas")));
    }
    if (ultimo && pagarList != 0) {
      setPagarList([]);
      localStorage.removeItem("contas");
      setContaFinal(0);
    }
    if (ultimo) {
      setContaFinal(0);
    }
    const loadContaFinal = (contaFinal) => {
      if (contaFinal === 0) {
        pagarList.map(({ pago, valor }) => {
          if (pago === true) {
            setContaFinal((e) => (e += Number(valor)));
          }
        });
      }
    };
    loadContaFinal(contaFinal);
  }, [pagarList, ultimo, id, contaFinal]);

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
      // conta.limpar();
      // valor.limpar();
      // vencimento.limpar();
      // renda.limpar();
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
        if (pagarList.id == target.value && pagarList.pago) {
          setContaFinal(Number(contaFinal) - Number(pagarList.valor));
        }
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
      <button onClick={() => console.log(id)}>Teste</button>
    </div>
  );
};

export default Form;
