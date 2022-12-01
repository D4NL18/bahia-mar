import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../services/api";

import "./botaoSair.css";

function BotaoSair() {
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <button className="botao-sair" onClick={handleClick}>
      <p className="texto-botao-sair">Sair</p>
    </button>
  );
}

export default BotaoSair;
