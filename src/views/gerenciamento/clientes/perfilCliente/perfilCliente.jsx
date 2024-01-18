import React, { useEffect, useRef, useState } from "react";

import TituloPequeno from "../../../../components/titulo/titulo-pequeno/tituloPequeno";
import Info from "../../../../components/info/info";
import Linha from "../../../../components/grafico/linha/linha";
import BotaoVoltar from "../../../../components/botao/botao-voltar/botaoVoltar";

import "./perfilCliente.css";
import { useParams } from "react-router-dom";
import { getTokenSessao } from "../../../../services/api";

function PerfilCliente() {
  const [info, setInfo] = useState();
  const id = useRef(useParams().id);

  useEffect(() => {
    fetch(
      `${
        process.env.REACT_APP_BACKEND_ROUTE
      }/clientes/relatorio-cliente/${getTokenSessao()}?id=${id.current}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then(async (res) => {
        const { status } = res;
        res = await res.json();
        if (status !== 200) {
          console.log(res.message); //mensagem de erro
          // mostrar mensagem de erro...
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

  /* const data = [
    { id: 1, year: 2016, userGain: 8000, orders: 20 },
    { id: 2, year: 2017, userGain: 18000, orders: 27 },
    { id: 3, year: 2018, userGain: 9000, orders: 25 },
    { id: 4, year: 2019, userGain: 14000, orders: 32 },
  ]; */
  /* const [faturamento] = useState({
    labels: data.map((data) => data.year),
    datasets: [
      {
        label: "Faturamento",
        data: data.map((data) => data.userGain),
        borderColor: "black",
      },
    ],
  }); */

  console.log(info);
  console.log(data);
  console.log(faturamento);
  return (
    <div className="entire-page-perfilCliente">
      <div className="painel-cliente">
        <section className="section-infos-cliente">
          <TituloPequeno title={info["NOME"]} />
          <div className="colunas-info-cliente">
            <div className="coluna-infos-cliente">
              <Info
                label="Faturamento"
                desc={faturamentoTotal.toFixed(2).replace(".", ",")}
              />
              <Info
                label="Física/Jurídica"
                desc={info["EH_PESSOA_FISICA"] === 0 ? "Jurídica" : "Física"}
              />
              <Info label="Telefone" desc={info["TELEFONE"]} />
              <Info label="CPF/CNPJ" desc={info["CPF_CNPJ"]} />
              <Info label="CEP" desc={info["CEP"]} />
            </div>
            <div className="coluna-infos-cliente">
              <Info label="Cidade" desc={info["CIDADE"]} />
              <Info label="Bairro" desc={info["BAIRRO"]} />
              <Info label="Rua" desc={info["RUA"]} />
              <Info label="Número" desc={info["NUMERO"]} />
              <Info label="Complemento" desc={info["COMPLEMENTO"]} />
            </div>
          </div>
        </section>
        <section className="section-grafico-cliente">
          <div className="caixa-grafico-cliente">
            <h3 className="titulo-grafico-cliente">Faturamento Anual</h3>
            <Linha chartData={faturamento} />
          </div>
          <div
            className="caixa-grafico-cliente"
            style={{ marginBottom: "1rem" }}
          >
            <h3 className="titulo-grafico-cliente">Pedidos Anuais</h3>
            <Linha chartData={pedidos} />
          </div>
        </section>
      </div>
      <BotaoVoltar path="/menu/gerenciamento" />
    </div>
  );
}

export default PerfilCliente;
