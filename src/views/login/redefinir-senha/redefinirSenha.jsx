import React, { useEffect, useState } from "react";

import TituloGrande from "../../../components/titulo/titulo-grande/tituloGrande";
import InputGrande from "../../../components/input/input-grande/inputGrande";
import BotaoGrande from "../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

import "./redefinirSenha.css";
import { useNavigate } from "react-router-dom";
import { testarLogin } from "../../../services/api";

function App() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  function handleClick() {
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/enviar-email/${email}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        const { error } = response;
        // deu ruim
        if (error) {
          console.error(error);
          alert(error);
        }
        // deu bom
        else {
          alert("E-mail de recuperação enviado.");
          navigate("/");
        }
      });
  }

  useEffect(() => {
    testarLogin(navigate, false);
  }, [navigate]);

  return (
    <div className="entire-page-redefinirSenha">
      <section className="title-section-redefinirSenha">
        <TituloGrande title="Redefinir Senha" />
      </section>
      <section className="caixa-central-section-redefinirSenha">
        <InputGrande
          label="E-mail"
          type="text"
          state={email}
          setState={setEmail}
        />
        <BotaoGrande
          text="Enviar E-mail"
          path="/redefinir-senha/nova-senha"
          handleClick={handleClick}
        />
        <p className="texto-alerta-redefinirSenha">
          Atenção! Entre no endereço de email informado para prosseguir com a
          redefinição de senha
        </p>
      </section>
      <BotaoVoltar path="/" />
    </div>
  );
}

export default App;
