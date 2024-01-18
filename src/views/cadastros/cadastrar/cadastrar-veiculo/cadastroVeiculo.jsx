import React, { useState } from "react";

import InputGrande from "../../../../components/input/input-grande/inputGrande";
import BotaoGrande from "../../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../../components/botao/botao-voltar/botaoVoltar";
import TituloMedio from "../../../../components/titulo/titulo-medio/tituloMedio";

import "./cadastroVeiculo.css";
import { useLocation, useNavigate } from "react-router-dom";
import { getTokenSessao, handleErrorBackend } from "../../../../services/api";

function CadastroMotorista() {
  const navigate = useNavigate();
  const location = useLocation();
  const estahRegistrando = !location.state;
  console.log(location.state);

  const [tipo, setTipo] = useState(
    estahRegistrando ? "" : location.state["TIPO"]
  );
  const [marca, setMarca] = useState(
    estahRegistrando ? "" : location.state["MARCA"]
  );
  const [modelo, setModelo] = useState(
    estahRegistrando ? "" : location.state["MODELO"]
  );
  const [placa, setPlaca] = useState(
    estahRegistrando ? "" : location.state["PLACA"]
  );

  const [aguardandoAsync, setAguardandoAsync] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (aguardandoAsync) return;

    setAguardandoAsync(true);
    const path = estahRegistrando ? "inserir" : "editar";
    fetch(
      `${
        process.env.REACT_APP_BACKEND_ROUTE
      }/veiculos/${path}/${getTokenSessao()}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: estahRegistrando ? undefined : location.state["ID"],
          type: tipo,
          branch: marca,
          model: modelo,
          licensePlate: placa,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          handleErrorBackend(navigate, res.error);
        } else {
          alert(`Veículo ${estahRegistrando ? "Registrado" : "Editado"}`);
          navigate("/menu/cadastros/veiculo");
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      })
      .finally(() => setAguardandoAsync(false));
  }

  return (
    <div className="entire-page-cadastroVeiculo">
      <header className="header-cadastroVeiculo">
        <TituloMedio
          title={`${estahRegistrando ? "Cadastrar" : "Editar"} Veículo`}
        />
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
            inputProps={{
              type: "text",
              required: true,
              minLength: 7,
              maxLength: 8,
            }}
            state={placa}
            setState={setPlaca}
          />
        </section>
        <section className="botao-cadastroVeiculo">
          <BotaoGrande text={`${estahRegistrando ? "Cadastrar" : "Editar"}`} />
        </section>
      </form>
      <BotaoVoltar path="/menu/cadastros/veiculo" />
    </div>
  );
}

export default CadastroMotorista;
