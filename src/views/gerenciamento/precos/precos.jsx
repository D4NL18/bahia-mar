import React from 'react'

import Tabela from '../../../components/tabela/tabela'
import TituloMedio from '../../../components/titulo/titulo-medio/tituloMedio'
import BotaoVoltar from '../../../components/botao/botao-voltar/botaoVoltar'

import './precos.css'

function Precos() {

    const colunas = ["ID", "Produto", "Preço", "5%", "10%", "15%", "20%"]

    const tableData = [
        { id: 1, produto: 'Galão 20L', preco: 50 },
        { id: 2, produto: 'Garrafa 2L', preco: 20 },
        { id: 3, produto: 'Garrafa 1L', preco: 10 },
        { id: 4, produto: 'Garrafa 500ml', preco: 5 },
    ]


    return (
        <div className='entire-page-precos'>
            <header className='header-precos'>
                <TituloMedio title="Tabela de Preços"></TituloMedio>
            </header>
            <body className='body-precos'>
                <Tabela tableData={tableData} colunas={colunas} tipo="precos" />
            </body>
            <BotaoVoltar path="/menu/gerenciamento"></BotaoVoltar>
        </div>
    )
}

export default Precos;