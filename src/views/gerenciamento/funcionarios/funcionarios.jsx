import React from "react";

import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import EmployeList from "../../../components/clientList/list/list";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";
import "./funcionarios.css";
import { useState } from "react";
import { useEffect } from "react";

function Funcionarios() {
  const [funcionarios, setFuncionarios] = useState(undefined);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/obter-clientes?status=true`, {
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
          setFuncionarios(res);
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      });
  }, []);

  if (!funcionarios) return <></>;

  console.log(funcionarios);
  return (
    <div className="entire-page-funcionarios">
      <header className="header-funcionarios">
        <TituloMedio title="Funcionarios" />
      </header>
      <div className="body-funcionarios">
        <EmployeList data={funcionarios} tipo="funcionarios" />
      </div>
      <BotaoVoltar path="/menu/gerenciamento" />
    </div>
  );
}

export default Funcionarios;
