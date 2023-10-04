import React, { useEffect, useRef, useState } from "react";

import DadosVendas from "../../../components/dadosVendas/dadosVendas";
import Linha from "../../../components/grafico/linha/linha";
import Tabela from "../../../components/tabela/tabela";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

import PaidIcon from "@mui/icons-material/Paid";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import SellIcon from "@mui/icons-material/Sell";

import "./perfilFuncionario.css";
import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import { getTokenSessao, handleErrorBackend } from "../../../services/api";
import { useNavigate, useParams } from "react-router-dom";

function PerfilFuncionario() {
  const navigate = useNavigate();
  const [info, setInfo] = useState(undefined);
  const id = useRef(useParams().id);

  /*const data = [
    { id: 1, year: 2016, userGain: 8000, userLost: 823 },
    { id: 2, year: 2017, userGain: 18000, userLost: 800 },
    { id: 3, year: 2018, userGain: 9000, userLost: 723 },
    { id: 4, year: 2019, userGain: 14000, userLost: 923 },
  ];

  const tableData = [
    { id: 1, vendedor: "Daniel", cliente: "Marinho", faturamento: "600,00" },
    { id: 2, vendedor: "Jose", cliente: "Auto", faturamento: "200,00" },
    { id: 3, vendedor: "Marina", cliente: "Calheira", faturamento: "300,00" },
    { id: 4, vendedor: "Luan", cliente: "Machado", faturamento: "400,00" },
    { id: 5, vendedor: "Rafael", cliente: "Santos", faturamento: "100,00" },
  ];
  const colunas = ["ID", "Vendedor", "Cliente", "Faturamento"];

  const [faturamento] = useState({
    labels: data.map((data) => data.year),
    datasets: [
      {
        label: "Faturamento",
        data: data.map((data) => data.userGain),
        borderColor: "black",
      },
    ],
  });*/

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
  }, []);

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
              <DadosVendas
                label="Faturamento"
                info={`R$ ${faturamentoTotal.toString().replace(".", ",")}`}
              />
              <DadosVendas label="Email" info={info["EMAIL"]} />
            </div>
            <div className="linha-infos-perfilFuncionario">
              <DadosVendas label="Vendas" info={values.length} />
              <DadosVendas label="CPF" info={info["CPF"]} />
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
