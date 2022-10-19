import React, { useState } from "react";

import InputGrande from "../../../../components/input/input-grande/inputGrande";
import BotaoGrande from "../../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../../components/botao/botao-voltar/botaoVoltar";
import TituloMedio from "../../../../components/titulo/titulo-medio/tituloMedio";

import "./cadastroVeiculo.css";

function CadastroMotorista() {
  const [tipo, setTipo] = useState("");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [placa, setPlaca] = useState("");

  const [estahRegistrando, setEstahRegistrando] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (estahRegistrando) return;

    setEstahRegistrando(true);
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/inserir-veiculo`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        type: tipo,
        branch: marca,
        model: modelo,
        licensePlate: placa,
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

  return (
    <div className="entire-page-cadastroVeiculo">
      <header className="header-cadastroVeiculo">
        <TituloMedio title="Cadastrar Veiculo" />
      </header>
      <form onSubmit={handleSubmit} className="body-cadastroVeiculo">
        <section className="coluna-inputs-cadastroVeiculo">
          <InputGrande
            label="Tipo"
            inputProps={{ type: "text", required: true, maxLength: 50 }}
            state={tipo}
            setState={setTipo}
          />
          <InputGrande
            label="Marca"
            inputProps={{ type: "text", required: true, maxLength: 50 }}
            state={marca}
            setState={setMarca}
          />
          <InputGrande
            label="Modelo"
            inputProps={{ type: "text", required: true, maxLength: 50 }}
            state={modelo}
            setState={setModelo}
          />
          <InputGrande
            label="Placa"
            inputProps={{ type: "text", required: true, maxLength: 50 }}
            state={placa}
            setState={setPlaca}
          />
        </section>
        <section className="botao-cadastroVeiculo">
          <BotaoGrande text="Cadastrar" />
        </section>
      </form>
      <BotaoVoltar path="/menu/cadastros/veiculo" />
    </div>
  );
}

export default CadastroMotorista;
