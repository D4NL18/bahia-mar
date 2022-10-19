import React from "react";
import { useNavigate } from "react-router-dom";

import "./botaoGrande.css";

function BotaoGrande(props) {
  const { style, disabled, path } = props;

  const navigate = useNavigate();

  function handleClick() {
    if (path) navigate(`${props.path}`);
  }

  return (
    <button
      disabled={disabled}
      className="botao-grande"
      onClick={handleClick}
      style={!!style ? style : null}
    >
      <p className="texto-botao-grande">{props.text}</p>
    </button>
  );
}

export default BotaoGrande;
