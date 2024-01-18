import React from "react";

import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import EmployeList from "../../../components/clientList/list/list";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";
import "./funcionarios.css";
import { useState } from "react";
import { useEffect } from "react";
import { getTokenSessao, handleErrorBackend } from "../../../services/api";
import { useNavigate } from "react-router-dom";

function Funcionarios() {
  const navigate = useNavigate();
  const [funcionarios, setFuncionarios] = useState(undefined);

  useEffect(() => {
    fetch(
      `${
        process.env.REACT_APP_BACKEND_ROUTE
      }/funcionarios/obter/${getTokenSessao()}`,
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
          handleErrorBackend(navigate, res.error);
        } else {
          setFuncionarios(res);
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      });
  }, [navigate]);

  if (!funcionarios) return <></>;

  console.log(funcionarios);
  return (
    <div className="entire-page-funcionarios">
      <header className="header-funcionarios">
        <TituloMedio title="Funcionários" />
      </header>
      <div className="body-funcionarios">
        <EmployeList data={funcionarios} tipo="funcionarios" />
      </div>
      <BotaoVoltar path="/menu/gerenciamento" />
    </div>
  );
}

export default Funcionarios;
