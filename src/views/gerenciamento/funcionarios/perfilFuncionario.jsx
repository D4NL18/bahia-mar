import React, { useEffect, useState } from "react";

import TituloPequeno from "../../../components/titulo/titulo-pequeno/tituloPequeno";
import Info from "../../../components/info/info";
import DadosVendas from "../../../components/dadosVendas/dadosVendas";
import Linha from "../../../components/grafico/linha/linha";
import Tabela from '../../../components/tabela/tabela'
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

import PaidIcon from '@mui/icons-material/Paid';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import SellIcon from '@mui/icons-material/Sell';

import "./perfilFuncionario.css";
import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";


function PerfilFuncionario() {

    const data = [
        { id: 1, year: 2016, userGain: 8000, userLost: 823 },
        { id: 2, year: 2017, userGain: 18000, userLost: 800 },
        { id: 3, year: 2018, userGain: 9000, userLost: 723 },
        { id: 4, year: 2019, userGain: 14000, userLost: 923 }
    ]

    const tableData = [
        { id: 1, vendedor: 'Daniel', cliente: 'Marinho', faturamento: '600,00' },
        { id: 2, vendedor: 'Jose', cliente: 'Auto', faturamento: '200,00' },
        { id: 3, vendedor: 'Marina', cliente: 'Calheira', faturamento: '300,00' },
        { id: 4, vendedor: 'Luan', cliente: 'Machado', faturamento: '400,00' },
        { id: 5, vendedor: 'Rafael', cliente: 'Santos', faturamento: '100,00' },
    ]
    const colunas = ["ID", "Vendedor", "Cliente", "Faturamento"]

    const [faturamento] = useState({
        labels: data.map((data) => data.year),
        datasets: [{
            label: "Faturamento",
            data: data.map((data) => data.userGain),
            borderColor: 'black',
        }],
    })


    return (
        <body className="entire-page-perfilFuncionario">
            <div className="div-box-perfilFuncionario">
                <section className="section-infos-perfilFuncionario">
                    <TituloMedio title="Nome" />
                    <div className="infos-perfilFuncionario">
                        <div className="linha-infos-perfilFuncionario">
                            <DadosVendas label="Faturamento" info="R$10,00" />
                            <DadosVendas label="Email" info="d@email.com" />
                        </div>
                        <div className="linha-infos-perfilFuncionario">
                            <DadosVendas label="Vendas" info="54" />
                            <DadosVendas label="CPF" info="857.955.385-74" />
                        </div>
                        <section className="grafico-perfilFuncionario">
                            <h2 className='titulo-grafico-perfilFuncionario'><PointOfSaleIcon fontSize='large' />Tabela de Vendas </h2>
                            <Tabela tableData={tableData} colunas={colunas} tipo="vendas" />
                        </section>
                    </div>
                </section>
                <section className="section-graficos-perfilFuncionario">
                    <section className="grafico-perfilFuncionario">
                        <h2 className='titulo-grafico-perfilFuncionario'><PaidIcon fontSize='large' />Faturamento </h2>
                        <Linha chartData={faturamento} />
                    </section>
                    <section className="grafico-perfilFuncionario">
                        <h2 className='titulo-grafico-perfilFuncionario'><SellIcon fontSize='large' />Vendas </h2>
                        <Linha chartData={faturamento} />
                    </section>
                </section>
            </div>
            <BotaoVoltar path="/menu/gerenciamento" />
        </body>
    );
}

export default PerfilFuncionario;
