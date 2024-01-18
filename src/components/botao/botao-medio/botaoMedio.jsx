import React from "react";
import { useNavigate } from "react-router-dom";

import "./botaoMedio.css";

function BotaoMedio(props) {
  const { style } = props;

  const navigate = useNavigate();

  function handleClick() {
    /*if (
      props.tipo === "Veículo" ||
      props.tipo === "Administrador" ||
      props.tipo === "Colaborador" ||
      props.tipo === "Cliente"
    ) {
      navigate(`${props.path}`);
    } else if (props.tipo === "Gerenciamento") {
      navigate(`${props.path}`);
    }*/
    if (props.path) navigate(props.path);
  }

  return (
    <button className="botao-medio" onClick={handleClick} style={style || {}}>
      <p className="texto-botao-medio">{props.text}</p>
    </button>
  );
}

export default BotaoMedio;
