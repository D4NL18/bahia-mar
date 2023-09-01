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
          isPago={op["STATUS"]}
          cpf={op["CPF_CNPJ"]}
          id={op["ID"]}
        />
      ))}
    </div>
  );
}

export default List;
