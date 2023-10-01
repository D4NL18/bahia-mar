import React from "react";
import { useNavigate } from "react-router-dom";

import "./item.css";

function Item(props) {
  const navigate = useNavigate();
  function handleClick() {
    (props.tipo == "clientes") ? 
    navigate(`/cliente?id=${props.id}`)
    :
    // navigate(`/menu/gerenciamento/funcionarios/funcionario?id=${props.id}`)
    navigate(`/menu/gerenciamento/funcionarios/funcionario`)
  }

  return (
    <button className="entire-item" onClick={handleClick}>
      <div className="div-nome-item">
        <h3 className="texto-item" style={{ width: "38%" }}>
          Nome: {props.nome}
        </h3>
        <h3 className="texto-item">CPF: {props.cpf}</h3>
        <h3 className="texto-item">Status:</h3>
      </div>
      <div className="div-pago-item">
        <div
          className="cor-pago-item"
          style={{ backgroundColor: props.isPago ? "green" : "red" }}
        />
      </div>
    </button>
  );
}

export default Item;
