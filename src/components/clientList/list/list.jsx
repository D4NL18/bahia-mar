import React from "react";

import Item from "../item/item";
import SearchBar from "../../searchBar/searchBar";

import "./list.css";

function List(props) {
  return (
    <div>
      <SearchBar />
      {props.data.map((op, key) => (
        <Item
          key={key}
          nome={op["NOME"]}
          isVerde={
            props.tipo === "clientes" ? op["STATUS"] : op["EH_ADMIN"] === 1
          }
          cpf={op["CPF_CNPJ"] || op["CPF"]}
          id={op["ID"]}
          tipo={props.tipo}
        />
      ))}
    </div>
  );
}

export default List;
