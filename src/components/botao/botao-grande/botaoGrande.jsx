import React from "react";
import { useNavigate } from "react-router-dom";

import "./botaoGrande.css";

function BotaoGrande(props) {
  const { style, text, disabled, path, handleClick } = props;

  const navigate = useNavigate();

  function _handleClick() {
    if (path) navigate(path);
  }

  return (
    <button
      disabled={disabled}
      type="submit"
      className="botao-grande"
      onClick={handleClick || _handleClick}
      style={style}
    >
      <p className="texto-botao-grande">{text}</p>
    </button>
  );
}

export default BotaoGrande;
