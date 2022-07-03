import React from "react";
import { useNavigate } from "react-router-dom";

import "./botaoSair.css";

function BotaoSair(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <button className="botao-sair" onClick={handleClick}>
      <p className="texto-botao-sair">Sair</p>
    </button>
  );
}

export default BotaoSair;
