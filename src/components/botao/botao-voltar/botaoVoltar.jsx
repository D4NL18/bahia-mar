import React from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "./botaoVoltar.css";

function BotaoVoltar(props) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(`${props.path}`);
  }

  return (
    <button className="background-botao-voltar" onClick={handleClick}>
      <div className="botao-voltar">
        <ArrowBackIcon className="seta-bota-voltar" />
      </div>
    </button>
  );
}

export default BotaoVoltar;
