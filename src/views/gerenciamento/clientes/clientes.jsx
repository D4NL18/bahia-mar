import React from "react";

import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import ClientList from "../../../components/clientList/list/list";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";
import "./clientes.css";
import { useState } from "react";
import { useEffect } from "react";

function Clientes() {
  const [clientes, setClientes] = useState(undefined);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/obter-clientes`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        const { status } = res;
        res = await res.json();
        if (status !== 200) {
          console.log(res.message); //mensagem de erro
          // mostrar mensagem de erro...
        } else {
          // deu bom, proseguir...
          setClientes(res);
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      });
  }, []);

  if (!clientes) return <></>;

  console.log(clientes);
  return (
    <div className="entire-page-clientes">
      <header className="header-clientes">
        <TituloMedio title="Clientes" />
      </header>
      <div className="body-clientes">
        <ClientList data={clientes} />
      </div>
      <BotaoVoltar path="/menu/gerenciamento" />
    </div>
  );
}

export default Clientes;
