import React from "react";

import Tabela from "../../../components/tabela/tabela";
import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

import "./precos.css";
import { useEffect } from "react";
import { useState } from "react";

function Precos() {
  const [produtos, setProdutos] = useState(undefined);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/obter-produtos`, {
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
          setProdutos(res);
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      });
  }, []);

  const colunas = ["ID", "Produto", "Preço", "5%", "10%", "15%", "20%"];

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
