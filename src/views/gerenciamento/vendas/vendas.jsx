import React, { useState } from 'react'

import TabelaVendas from '../../../components/tabela/vendas/tabelaVendas'
import Barras from '../../../components/grafico/barras/barras'
import Linha from '../../../components/grafico/linha/linha'
import InputPequeno from '../../../components/input/input-pequeno/inputPequeno'
import Select from '../../../components/input/select-pequeno/selectPequeno'
import BotaoVoltar from '../../../components/botao/botao-voltar/botaoVoltar'


import './vendas.css'


function Vendas() {

    const tableData = [
        { id: 1, vendedor: 'Daniel', cliente: 'Marinho', faturamento: '600,00' },
        { id: 2, vendedor: 'Jose', cliente: 'Auto', faturamento: '200,00' },
        { id: 3, vendedor: 'Marina', cliente: 'Calheira', faturamento: '300,00' },
        { id: 4, vendedor: 'Luan', cliente: 'Machado', faturamento: '400,00' },
        { id: 5, vendedor: 'Rafael', cliente: 'Santos', faturamento: '100,00' },
    ]

    const data = [
        { id: 1, year: 2016, userGain: 8000, userLost: 823 },
        { id: 2, year: 2017, userGain: 18000, userLost: 800 },
        { id: 3, year: 2018, userGain: 9000, userLost: 723 },
        { id: 4, year: 2019, userGain: 14000, userLost: 923 }
    ]

    const [faturamento] = useState({
        labels: data.map((data) => data.year),
        datasets: [{
            label: "Faturamento",
            data: data.map((data) => data.userGain),
            borderColor: 'black',
        }],
    })
    const [faturamentoFuncionario] = useState({
        labels: data.map((data) => data.year),
        datasets: [{
            label: "Faturamento por Funcionario",
            data: data.map((data) => data.userGain),
            backgroundColor: ["red", "blue", "yellow", "green", "orange", "pink"],
            borderColor: 'black',
            borderWidth: 3,
        }]
    })
    const [faturamentoProduto] = useState({
        labels: data.map((data) => data.year),
        datasets: [{
            label: "Faturamento por Produto",
            data: data.map((data) => data.userGain),
            backgroundColor: ["red", "blue", "yellow", "green", "orange", "pink"],
            borderColor: 'black',
            borderWidth: 3,
        }]
    })
    const [quantProduto] = useState({
        labels: data.map((data) => data.year),
        datasets: [{
            label: "Quantidade por Produto",
            data: data.map((data) => data.userGain),
            backgroundColor: ["red", "blue", "yellow", "green", "orange", "pink"],
            borderColor: 'black',
            borderWidth: 3,
        }]
    })

    const colunas = ["ID", "Vendedor", "Cliente", "Faturamento"]

    const tipoTempo = ["Dia", "Mês", "Ano"]
    return (
        <div className="entire-page-vendas">
            <body className="painel-vendas" >
                <section className="filtros-vendas">
                    <Select options={tipoTempo} />
                    <InputPequeno type="date" />
                </section>
                <section className="faturamento-venda">
                <Linha chartData={faturamento} />
                </section>
                <section className="faturamento-funcionarios-vendas">
                    <Barras chartData={faturamentoFuncionario} />
                </section>
                <section className="produtos-faturamento-venda">
                    <Barras chartData={faturamentoProduto} />
                </section>
                <section className="produtos-quantidade-venda">
                    <Barras chartData={quantProduto} />
                </section>
                <section className="tabela-vendas">
                    <TabelaVendas tableData={tableData} colunas={colunas} tipo="vendas" />
                </section>
            </body>
            <BotaoVoltar path="/menu/gerenciamento" />
        </div>
    )
}

export default Vendas;