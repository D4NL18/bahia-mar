import React from "react";

import Tabela from "../../../components/tabela/tabela";
import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

import "./precos.css";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getTokenSessao,
  logout,
  testarEhAdmin,
  testarLogin,
} from "../../../services/api";

function Precos() {
  const navigate = useNavigate();

  const colunas = ["ID", "Produto", "Preço", "5%", "10%", "15%", "20%"];

  const [produtos, setProdutos] = useState(undefined);

  useEffect(() => {
    fetch(
      `${
        process.env.REACT_APP_BACKEND_ROUTE
      }/obter-produtos/${getTokenSessao()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          alert(res.error);
          logout();
          navigate("/");
        } else {
          setProdutos(res);
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

  if (!produtos) return <></>;

  console.log(produtos);
  return (
    <div className="entire-page-precos">
      <header className="header-precos">
        <TituloMedio title="Tabela de Preços"></TituloMedio>
      </header>
      <div className="body-precos">
        <Tabela tableData={produtos} colunas={colunas} tipo="precos" />
      </div>
      <BotaoVoltar path="/menu/gerenciamento"></BotaoVoltar>
    </div>
  );
}

export default Precos;
