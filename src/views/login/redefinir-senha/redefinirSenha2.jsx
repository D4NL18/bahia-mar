import React, { useEffect, useRef, useState } from "react";

import TituloGrande from "../../../components/titulo/titulo-grande/tituloGrande";
import InputGrande from "../../../components/input/input-grande/inputGrande";
import BotaoGrande from "../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

import "./redefinirSenha2.css";
import { useNavigate, useParams } from "react-router-dom";
import { testarLogin } from "../../../services/api";

function App() {
  const tokenRedefinirSenha = useRef(useParams().token);
  const navigate = useNavigate();

  const [isValidandoToken, setIsValidandoToken] = useState(true);
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();

    if (senha < 8 || senha > 15) return alert("Senha inválida");
    if (senha !== confSenha) return alert("As senhas não batem");

    fetch(
      `${process.env.REACT_APP_BACKEND_ROUTE}/redefinir-senha/${tokenRedefinirSenha.current}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newPassword: senha,
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
        } else {
          alert("Senha alterada com sucesso");
          navigate("/");
        }
      });
  }

  useEffect(() => {
    testarLogin(navigate, false).then(async (ficouNaPagina) => {
      if (ficouNaPagina) {
        if (!tokenRedefinirSenha.current) navigate("/");
        else setIsValidandoToken(false);
      }
    });
  }, [navigate]);

  if (isValidandoToken) return <></>;

  console.log(tokenRedefinirSenha.current);
  return (
    <div className="entire-page-redefinirSenha2">
      <section className="title-section-redefinirSenha2">
        <TituloGrande title="Redefinir Senha" />
      </section>
      <form
        className="caixa-central-section-redefinirSenha2"
        onSubmit={handleSubmit}
      >
        <InputGrande
          inputProps={{ minLength: 8, maxLength: 15, type: "password" }}
          label="Nova Senha"
          state={senha}
          setState={setSenha}
        />
        <InputGrande
          inputProps={{ minLength: 8, maxLength: 15, type: "password" }}
          label="Confirmar nova senha"
          state={confSenha}
          setState={setConfSenha}
        />
        <BotaoGrande text="Redefinir Senha" />
      </form>
      <BotaoVoltar path="/" />
    </div>
  );
}

export default App;
