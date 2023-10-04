import React from "react";
import { useNavigate } from "react-router-dom";

import "./item.css";

function Item(props) {
  const navigate = useNavigate();
  const ehCliente = props.tipo === "clientes";

  return (
    <button
      className="entire-item"
      onClick={() => navigate(`/menu/gerenciamento/${props.tipo}/${props.id}`)}
    >
      <div className="div-nome-item">
        <h3 className="texto-item" style={{ width: "38%" }}>
          Nome: {props.nome}
        </h3>
        <h3 className="texto-item">CPF: {props.cpf}</h3>
        <h3 className="texto-item">{ehCliente ? "Status:" : "ADM:"}</h3>
      </div>
      <div className="div-pago-item">
        <div
          className="cor-pago-item"
          style={{ backgroundColor: props.isVerde ? "green" : "red" }}
        />
      </div>
    </button>
  );
}

export default Item;
