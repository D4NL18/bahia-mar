import React from "react";

import InputGrande from "../../../../components/input/input-grande/inputGrande";
import BotaoGrande from "../../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../../components/botao/botao-voltar/botaoVoltar";
import TituloMedio from "../../../../components/titulo/titulo-medio/tituloMedio";

import "./cadastroAdm.css";
import { useState } from "react";

function CadastroAdm() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [senha, setSenha] = useState("");

  const [estahRegistrando, setEstahRegistrando] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    if (estahRegistrando) return;

    setEstahRegistrando(true);
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/inserir-funcionario`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nome,
        email,
        cpf,
        password: senha,
        isAdmin: true,
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
    <div className="entire-page-cadastroAdm">
      <header className="header-cadastroAdm">
        <TituloMedio title="Cadastrar Administrador" />
      </header>
      <form onSubmit={handleSubmit} className="body-cadastroAdm">
        <section className="coluna-inputs-cadastroAdm">
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
              required: true,
              minLength: 5,
              maxLength: 15,
            }}
            state={senha}
            setState={setSenha}
          />
        </section>
        <section className="botao-cadastroAdm">
          <BotaoGrande disabled={estahRegistrando} text="Cadastrar" />
        </section>
      </form>
      <BotaoVoltar path="/menu/cadastros/funcionario/administrador" />
    </div>
  );
}

export default CadastroAdm;
