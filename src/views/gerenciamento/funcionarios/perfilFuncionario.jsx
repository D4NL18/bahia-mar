import React, { useEffect, useRef, useState } from "react";

import DadosVendas from "../../../components/dadosVendas/dadosVendas";
import Linha from "../../../components/grafico/linha/linha";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

import PaidIcon from "@mui/icons-material/Paid";
import SellIcon from "@mui/icons-material/Sell";

import "./perfilFuncionario.css";
import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import { getTokenSessao, handleErrorBackend } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

function PerfilFuncionario() {
  const navigate = useNavigate();
  const [info, setInfo] = useState(undefined);
  const id = useRef(useParams().id);

  useEffect(() => {
    fetch(
      `${
        process.env.REACT_APP_BACKEND_ROUTE
      }/funcionarios/relatorio-funcionario/${getTokenSessao()}?id=${
        id.current
      }`,
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
          setInfo(res);
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      });
  }, [navigate]);

  if (!info) return <></>;
  console.log(info);

  let faturamentoTotal = 0;
  for (const venda of Object.values(info["VENDAS"]))
    faturamentoTotal += venda["QUANT_PAGO"];

  const data = {};
  for (const venda of Object.values(info["VENDAS"])) {
    const ano = venda["HORARIO_VENDA"].split("-")[0];
    if (!data[ano]) data[ano] = { profit: 0, orders: 0 };

    data[ano].profit += venda["QUANT_PAGO"];
    data[ano].orders++;
  }

  // Ordena os dados em ordem crescente de ano
  const orderedData = Object.keys(data)
    .sort()
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});
  const years = Object.keys(orderedData);
  const values = Object.values(orderedData);
  const faturamento = {
    labels: years,
    datasets: [
      {
        label: "Faturamento",
        data: values.map((value) => value.profit),
        borderColor: "black",
      },
    ],
  };
  const pedidos = {
    labels: years,
    datasets: [
      {
        label: "Pedidos",
        data: values.map((value) => value.orders),
        borderColor: "black",
      },
    ],
  };

  return (
    <div className="entire-page-perfilFuncionario">
      <div className="div-box-perfilFuncionario">
        <section className="section-infos-perfilFuncionario">
          <TituloMedio title="Nome" />
          <div className="infos-perfilFuncionario">
            <div className="linha-infos-perfilFuncionario">
            <DadosVendas label="CPF" info={info["CPF"]} />
              
              <DadosVendas label="Email" info={info["EMAIL"]} />
            </div>
            <div className="linha-infos-perfilFuncionario">
              <DadosVendas label="Vendas" info={values.length} />
              <DadosVendas
                label="Faturamento"
                info={`R$ ${faturamentoTotal.toString().replace(".", ",")}`}
              />
            </div>
            {/*<section className="grafico-perfilFuncionario">
              <h2 className="titulo-grafico-perfilFuncionario">
                <PointOfSaleIcon fontSize="large" />
                Tabela de Vendas{" "}
              </h2>
              <Tabela tableData={tableData} colunas={colunas} tipo="vendas" />
            </section>*/}
          </div>
        </section>
        <section className="section-graficos-perfilFuncionario">
          <section className="grafico-perfilFuncionario">
            <h2 className="titulo-grafico-perfilFuncionario">
              <PaidIcon fontSize="large" />
              Faturamento{" "}
            </h2>
            <Linha chartData={faturamento} />
          </section>
          <section className="grafico-perfilFuncionario">
            <h2 className="titulo-grafico-perfilFuncionario">
              <SellIcon fontSize="large" />
              Vendas{" "}
            </h2>
            <Linha chartData={pedidos} />
          </section>
        </section>
      </div>
      <BotaoVoltar path="/menu/gerenciamento" />
    </div>
  );
}

export default PerfilFuncionario;
