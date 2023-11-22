import React, { useEffect, useState } from "react";

import Tabela from "../../../components/tabela/tabela";
import Barras from "../../../components/grafico/barras/barras";
import Linha from "../../../components/grafico/linha/linha";
import Doughnut from "../../../components/grafico/doughnut/doughnut";
import InputVendas from "../../../components/input/input-vendas/inputVendas";
import Select from "../../../components/input/select-pequeno/selectPequeno";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";
import PersonIcon from "@mui/icons-material/Person";
import PaidIcon from "@mui/icons-material/Paid";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import SellIcon from "@mui/icons-material/Sell";
import DadosVendas from "../../../components/dadosVendas/dadosVendas";
import Logo from "../../../images/logo.png";

import "./vendas.css";
import { getTokenSessao, handleErrorBackend } from "../../../services/api";
import { useNavigate } from "react-router-dom";

function Vendas() {
  const navigate = useNavigate();

  const [sales, setSales] = useState(undefined);
  const [numMeta, setNumMeta] = useState(0);

  const data = [
    { id: 1, year: 2016, userGain: 8000, userLost: 823 },
    { id: 2, year: 2017, userGain: 18000, userLost: 800 },
    { id: 3, year: 2018, userGain: 9000, userLost: 723 },
    { id: 4, year: 2019, userGain: 14000, userLost: 923 },
  ];

  const dataMeta = [10000, 8800];

  const [meta] = useState({
    labels: ["Concluido", "Restante"],
    datasets: [
      {
        label: "Meta de Faturamento",
        data: [
          dataMeta[1],
          dataMeta[0] > dataMeta[1] ? dataMeta[0] - dataMeta[1] : 0,
        ],
        backgroundColor: ["green", "red"],
        borderColor: "black",
        borderWidth: 3,
      },
    ],
  });

  const colunas = ["ID", "Vendedor", "Cliente", "Faturamento"];

  const tipoTempo = ["Dia", "Mês", "Ano"];

  useEffect(() => {
    if (!!sales) return;

    fetch(
      `${process.env.REACT_APP_BACKEND_ROUTE}/vendas/obter/${getTokenSessao()}`,
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
        } else if (res.message) {
          console.log(res.message);
          alert("Falha de conexão");
        } else {
          console.log(res);
          setSales(res);
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      });
  }, [navigate, sales]);

  if (!sales) return <></>;

  let faturamentoData = {};
  const faturamentoFuncionarioData = {};
  const produtoData = {};
  for (const venda of Object.values(sales)) {
    const ano = venda["HORARIO_VENDA"].split("-")[0];
    const idFunc = venda["FUNCIONARIO"]["ID"];
    if (!(ano in faturamentoData)) faturamentoData[ano] = 0;
    if (!(idFunc in faturamentoFuncionarioData))
      faturamentoFuncionarioData[idFunc] = {
        label: `${venda["FUNCIONARIO"]["NOME"]}`,
        earning: 0,
      };

    faturamentoData[ano] += venda["QUANT_PAGO"];
    faturamentoFuncionarioData[idFunc].earning += venda["QUANT_PAGO"];
    for (const produto of venda["PRODUTOS"]) {
      const idProd = produto["ID"];
      if (!(idProd in produtoData))
        produtoData[idProd] = {
          label: produto["NOME"],
          price: produto["PRECO"],
          quantity: 0,
        };

      produtoData[idProd].quantity += produto["QUANTIDADE"];
    }
  }
  // Ordena os dados em ordem crescente de ano
  faturamentoData = Object.keys(faturamentoData)
    .sort()
    .reduce((obj, key) => {
      obj[key] = faturamentoData[key];
      return obj;
    }, {});
  const faturamento = {
    labels: Object.keys(faturamentoData),
    datasets: [
      {
        label: "Faturamento",
        data: faturamentoData,
        borderColor: "black",
      },
    ],
  };

  const faturamentoFuncionario = {
    labels: Object.values(faturamentoFuncionarioData).map((func) => func.label),
    datasets: [
      {
        label: "Faturamento por Funcionário",
        data: Object.values(faturamentoFuncionarioData).map(
          (func) => func.earning
        ),
        backgroundColor: ["red", "blue", "yellow", "green", "orange", "pink"],
        borderColor: "black",
      },
    ],
  };

  const faturamentoProduto = {
    labels: Object.values(produtoData).map((prod) => prod.label),
    datasets: [
      {
        label: "Faturamento por Produto",
        data: Object.values(produtoData).map(
          (prod) => prod.quantity * prod.price
        ),
        backgroundColor: ["red", "blue", "yellow", "green", "orange", "pink"],
        borderColor: "black",
        borderWidth: 3,
      },
    ],
  };
  const quantProduto = {
    labels: Object.values(produtoData).map((prod) => prod.label),
    datasets: [
      {
        label: "Quantidade por Produto",
        data: Object.values(produtoData).map((prod) => prod.quantity),
        backgroundColor: ["red", "blue", "yellow", "green", "orange", "pink"],
        borderColor: "black",
        borderWidth: 3,
      },
    ],
  };

  const tabelaVendas = Object.entries(sales).map(([id, sale]) => ({
    id,
    vendedor: sale["FUNCIONARIO"]["NOME"],
    cliente: sale["CLIENTE"]["NOME"],
    faturamento: sale["QUANT_PAGO"],
  }));

  return (
    <div className="entire-page-vendas">
      <div className="painel-vendas">
        <section className="filtros-vendas">
          <div className="meta-vendas">
            <img src={Logo} className="logo-vendas" alt="logo" />
            <InputVendas
              label="Cadastrar Meta"
              inputProps={{ type: "number", maxLength: 50 }}
              state={numMeta}
              setState={setNumMeta}
            />
            <div className="grafico-meta-vendas">
              <Doughnut chartData={meta} />
            </div>
          </div>
          <div className="infos-filtros-vendas">
            <Select options={tipoTempo} />
            <InputVendas inputProps={{ type: "date" }} />
            <DadosVendas label="Faturamento" info={`R$ ${data[3].userGain}`} />
            <DadosVendas label="Vendas" info={"57"} />
          </div>
        </section>
        <section className="faturamento-venda">
          <h2 className="titulo-grafico-vendas">
            <PaidIcon fontSize="large" />
            Faturamento{" "}
          </h2>
          <Linha chartData={faturamento} />
        </section>
        <section className="faturamento-funcionarios-vendas">
          <h2 className="titulo-grafico-vendas">
            <PersonIcon fontSize="large" />
            Faturamento por Funcionário{" "}
          </h2>
          <Barras chartData={faturamentoFuncionario} />
        </section>
        <section className="produtos-faturamento-venda">
          <h2 className="titulo-grafico-vendas">
            <LocalDrinkIcon fontSize="large" />
            Faturamento por Produto{" "}
          </h2>
          <Barras chartData={faturamentoProduto} />
        </section>
        <section className="produtos-quantidade-venda">
          <h2 className="titulo-grafico-vendas">
            <SellIcon fontSize="large" />
            Vendas por Produto{" "}
          </h2>
          <Barras chartData={quantProduto} />
        </section>
        <section className="tabela-vendas">
          <h2 className="titulo-grafico-vendas">
            <PointOfSaleIcon fontSize="large" />
            Tabela de Vendas{" "}
          </h2>
          <Tabela tableData={tabelaVendas} colunas={colunas} tipo="vendas" />
        </section>
      </div>
      <BotaoVoltar path="/menu/gerenciamento" />
    </div>
  );
}

export default Vendas;
