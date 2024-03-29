import React, { useEffect } from "react";

import InputGrande from "../../../../components/input/input-grande/inputGrande";
import BotaoGrande from "../../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../../components/botao/botao-voltar/botaoVoltar";
import TituloMedio from "../../../../components/titulo/titulo-medio/tituloMedio";

import "./cadastroAdm.css";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getTokenSessao,
  handleErrorBackend,
  testarEhAdmin,
  testarLogin,
} from "../../../../services/api";

function CadastroAdm() {
  const navigate = useNavigate();

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
    const path = estahRegistrando ? "inserir" : "editar";
    fetch(
      `${
        process.env.REACT_APP_BACKEND_ROUTE
      }/funcionarios/${path}/${getTokenSessao()}`,
      {
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
          isAdmin: true,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          handleErrorBackend(navigate, res.error);
        } else {
          alert(`Administrador ${estahRegistrando ? "Cadastrado" : "Editado"}`);
          navigate("/menu/cadastros/colaborador/administrador");
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      })
      .finally(() => setAguardandoAsync(false));
  }

  useEffect(() => {
    if (!testarLogin(navigate)) return;
    testarEhAdmin(navigate);
  }, [navigate]);

  return (
    <div className="entire-page-cadastroAdm">
      <header className="header-cadastroAdm">
        <TituloMedio
          title={`${estahRegistrando ? "Cadastrar" : "Editar"} Administrador`}
        />
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
              required: estahRegistrando,
              minLength: 5,
              maxLength: 15,
            }}
            state={senha}
            setState={setSenha}
          />
        </section>
        <section className="botao-cadastroAdm">
          <BotaoGrande
            disabled={aguardandoAsync}
            text={estahRegistrando ? "Cadastrar" : "Editar"}
          />
        </section>
      </form>
      <BotaoVoltar path="/menu/cadastros/colaborador/administrador" />
    </div>
  );
}

export default CadastroAdm;
