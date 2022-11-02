import React, { useState } from "react";

import InputPequeno from "../../../../../components/input/input-pequeno/inputPequeno";
import TituloMedio from "../../../../../components/titulo/titulo-medio/tituloMedio";
import BotaoVoltar from "../../../../../components/botao/botao-voltar/botaoVoltar";
import BotaoGrande from "../../../../../components/botao/botao-grande/botaoGrande";

import "./registrarVenda3.css";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function InputQuantProduto(props) {
  const { prod, quantProdStates, setQuantProdStates } = props;

  return (
    <InputPequeno
      label={`${prod["NOME"]} (R$${prod["PRECO"].replace(".", ",")})`}
      inputProps={{ type: "text", required: true, maxLength: 8 }}
      state={quantProdStates[prod["ID_PRODUTO"]]}
      setState={(value) => {
        const novoQuantProdStates = { ...quantProdStates };
        novoQuantProdStates[prod["ID_PRODUTO"]] = value;
        setQuantProdStates(novoQuantProdStates);
      }}
    />
  );
}

function RegistrarVenda() {
  const [estahRegistrando, setEstahRegistrando] = useState(false);
  const location = useLocation();
  const navigateProps = location.state;
  console.log(navigateProps);

  const [desc, setDesc] = useState("");
  const [quantPago, setQuantPago] = useState("");
  const [quantProdStates, setQuantProdStates] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    if (estahRegistrando) return;

    setEstahRegistrando(true);

    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/inserir-venda`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        employeeCpf: navigateProps.funcionario.split(" - ")[1],
        vehicleLicensePlate: navigateProps.veiculo.split(" - ")[1],
        clientCpfCnpj: navigateProps.cliente.split(" - ")[1],
        paymentMethod: navigateProps.metodoPagamento,
        discount: Number(desc.replace(",", ".")),
        amountPaid: Number(quantPago.replace(",", ".")),
      }),
    })
      .then(async (res) => {
        if (res.status !== 200) {
          console.log((await res.json()).message); //mensagem de erro
          // mostrar mensagem de erro...
        } else {
          // deu bom, proseguir...
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      })
      .finally(() => setEstahRegistrando(false));
  }

  useEffect(() => {
    const novoQuantProdStates = {};
    for (const prod of navigateProps.produtos)
      novoQuantProdStates[prod["ID_PRODUTO"]] = "0";

    setQuantProdStates(novoQuantProdStates);
  }, [navigateProps.produtos]);

  console.log(quantProdStates);
  return (
    <div className="entire-page-registrarVenda3">
      <header className="header-registrarVenda3">
        <TituloMedio title="Cadastrar Venda" />
      </header>
      <div className="body-registrarVenda3">
        <section className="caixa-central-registrarVenda3">
          <form onSubmit={handleSubmit} className="form-registrarVenda3">
            <InputPequeno
              label="Desconto"
              inputProps={{ type: "text", required: true, maxLength: 50 }}
              state={desc}
              setState={setDesc}
            />
            <InputPequeno
              label="Quanto foi pago"
              inputProps={{ type: "text", required: true, maxLength: 50 }}
              state={quantPago}
              setState={setQuantPago}
            />
            {navigateProps.produtos.map((prod) => (
              <InputQuantProduto
                key={prod["ID_PRODUTO"]}
                prod={prod}
                quantProdStates={quantProdStates}
                setQuantProdStates={setQuantProdStates}
              />
            ))}
            <BotaoGrande text="Cadastrar Venda" />
          </form>
        </section>
      </div>
      <BotaoVoltar path="/menu/cadastros/venda" />
    </div>
  );
}

export default RegistrarVenda;
