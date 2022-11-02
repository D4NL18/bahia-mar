import React from "react";
import { useNavigate } from "react-router-dom";

import "./botaoGrande.css";

function BotaoGrande(props) {
  const { style, text, disabled, path } = props;

  const navigate = useNavigate();

  function handleClick() {
    if (path) navigate(path);
  }

  return (
    <button
      disabled={disabled}
      className="botao-grande"
      onClick={handleClick}
      style={style}
    >
      <p className="texto-botao-grande">{text}</p>
    </button>
  );
}

export default BotaoGrande;
