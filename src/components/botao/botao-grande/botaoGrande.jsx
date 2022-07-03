import React from "react";
import { useNavigate } from "react-router-dom";

import "./botaoGrande.css";

function BotaoGrande(props) {
  const { style } = props;

  const navigate = useNavigate();

  function handleClick() {
    navigate(`${props.path}`);
  }

  return (
    <button
      className="botao-grande"
      onClick={handleClick}
      style={!!style ? style : null}
    >
      <p className="texto-botao-grande">{props.text}</p>
    </button>
  );
}

export default BotaoGrande;
