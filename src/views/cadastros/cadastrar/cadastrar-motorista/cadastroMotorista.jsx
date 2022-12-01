import React from "react";

import InputGrande from "../../../../components/input/input-grande/inputGrande";
import BotaoGrande from "../../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../../components/botao/botao-voltar/botaoVoltar";
import TituloMedio from "../../../../components/titulo/titulo-medio/tituloMedio";

import "./cadastroMotorista.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function CadastroMotorista() {
  const location = useLocation();
  const estahRegistrando = !location.state;
  console.log(location.state);

  const [nome, setNome] = useState(
    estahRegistrando ? "" : location.state["NOME"]
  );
  const [email, setEmail] = useState(
    estahRegistrando ? "" : location.state["EMAIL"]
  );
  const [cpf, setCpf] = useState(estahRegistrando ? "" : location.state["CPF"]);
  const [senha, setSenha] = useState("");

  const [aguardandoAsync, setAguardandoAsync] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (aguardandoAsync) return;

    setAguardandoAsync(true);
    const path = estahRegistrando
      ? "inserir-funcionario"
      : "editar-funcionario";
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/${path}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: estahRegistrando ? undefined : location.state["ID"],
        name: nome,
        email,
        cpf,
        password: senha,
        isAdmin: false,
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
      .finally(() => setAguardandoAsync(false));
  }

  return (
    <div className="entire-page-cadastroMotorista">
      <header className="header-cadastroMotorista">
        <TituloMedio
          title={`${estahRegistrando ? "Cadastrar" : "Editar"} Funcionário`}
        />
      </header>
      <form onSubmit={handleSubmit} className="body-cadastroMotorista">
        <section className="coluna-inputs-cadastroMotorista">
          <InputGrande
            label="Nome"
            inputProps={{ type: "text", required: true, maxLength: 50 }}
            state={nome}
            setState={setNome}
          />
          <InputGrande
            label="Email"
            inputProps={{ type: "email", required: true, maxLength: 50 }}
            state={email}
            setState={setEmail}
          />
          <InputGrande
            label="CPF"
            inputProps={{
              type: "text",
              required: true,
              minLength: 11,
              maxLength: 11,
            }}
            state={cpf}
            setState={setCpf}
          />
          <InputGrande
            label="Senha"
            inputProps={{
              type: "password",
              required: estahRegistrando,
              minLength: 5,
              maxLength: 15,
            }}
            state={senha}
            setState={setSenha}
          />
        </section>
        <section className="botao-cadastroMotorista">
          <BotaoGrande disabled={aguardandoAsync} text="Cadastrar" />
        </section>
      </form>
      <BotaoVoltar path="/menu/cadastros/colaborador/funcionario" />
    </div>
  );
}

export default CadastroMotorista;
