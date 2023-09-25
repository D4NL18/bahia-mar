import React, { useEffect, useRef, useState } from "react";

import TituloGrande from "../../../components/titulo/titulo-grande/tituloGrande";
import InputGrande from "../../../components/input/input-grande/inputGrande";
import BotaoGrande from "../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

import "./redefinirSenha2.css";
import { useNavigate, useParams } from "react-router-dom";
import { testarLogin, tokenEhValido } from "../../../services/api";

function App() {
  const token = useRef(useParams().token);
  const navigate = useNavigate();

  const [isValidatingToken, setIsValidatingToken] = useState(true);
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();

    if (senha < 8 || senha > 15) return alert("Senha inválida");
    if (senha !== confSenha) return alert("As senhas não batem");
  }

  useEffect(() => {
    testarLogin(navigate, false).then(async (ficouNaPagina) => {
      if (!ficouNaPagina) return;

      const ehValido = await tokenEhValido(
        token.current,
        "validar-jwt-redefinir-senha"
      );
      if (!ehValido) {
        alert("Token expirou ou não existe");
        return navigate("/");
      }

      setIsValidatingToken(false);
    });
  }, [navigate]);

  if (isValidatingToken) return <></>;

  console.log(token);
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
          inputProps={{ minLength: 8, maxLength: 15 }}
          label="Nova Senha"
          type="password"
          state={senha}
          setState={setSenha}
        />
        <InputGrande
          inputProps={{ minLength: 8, maxLength: 15 }}
          label="Confirmar nova senha"
          type="password"
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
