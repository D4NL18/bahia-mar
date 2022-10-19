import React from 'react'

import Tabela from '../../../components/tabela/tabela'
import TituloMedio from '../../../components/titulo/titulo-medio/tituloMedio'
import BotaoVoltar from '../../../components/botao/botao-voltar/botaoVoltar'

import './estoque.css'

function Estoque() {

    const colunas = ["ID", "Nome", "Ultima Compra", "Disponível", "Faturamento"]

    const tableData = [
        { id: 1, nome: 'Galão 20L', ultimaCompra: '50', disponivel: '34', faturamento: '600,00' },
        { id: 2, nome: 'Garrafa 2L', ultimaCompra: '100', disponivel: '40', faturamento: '200,00' },
        { id: 3, nome: 'Garrafa 1L', ultimaCompra: '150', disponivel: '93', faturamento: '300,00' },
        { id: 4, nome: 'Garrafa 500ml', ultimaCompra: '250', disponivel: '27', faturamento: '400,00' },
    ]


    return (
        <div className='entire-page-estoque'>
            <header className='header-estoque'>
                <TituloMedio title="Controle de Estoque"></TituloMedio>
            </header>
            <body className='body-estoque'>
                <Tabela tableData={tableData} colunas={colunas} tipo="estoque" />
            </body>
            <BotaoVoltar path="/menu/gerenciamento"></BotaoVoltar>
        </div>
    )
}

export default Estoque;