import React from "react";

import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import ClientList from "../../../components/clientList/list/list";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";
import "./clientes.css";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTokenSessao,
  logout,
  testarEhAdmin,
  testarLogin,
} from "../../../services/api";

function Clientes() {
  const navigate = useNavigate();
  const [clientes, setClientes] = useState(undefined);

  useEffect(() => {
    fetch(
      `${
        process.env.REACT_APP_BACKEND_ROUTE
      }/clientes/obter-clientes/${getTokenSessao()}?status=true`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then(async (res) => {
        if (res.error) {
          alert(res.error);
          logout();
          navigate("/");
        } else {
          setClientes(res);
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      });
  }, [navigate]);

  useEffect(() => {
    if (!testarLogin(navigate)) return;
    testarEhAdmin(navigate);
  }, [navigate]);

  if (!clientes) return <></>;

  console.log(clientes);
  return (
    <div className="entire-page-clientes">
      <header className="header-clientes">
        <TituloMedio title="Clientes" />
      </header>
      <div className="body-clientes">
        <ClientList data={clientes} tipo="clientes" />
      </div>
      <BotaoVoltar path="/menu/gerenciamento" />
    </div>
  );
}

export default Clientes;
