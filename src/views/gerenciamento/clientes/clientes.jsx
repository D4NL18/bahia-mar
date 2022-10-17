import React from 'react'

import TituloMedio from '../../../components/titulo/titulo-medio/tituloMedio';
import ClientList from '../../../components/clientList/list/list';
import BotaoVoltar from '../../../components/botao/botao-voltar/botaoVoltar'
import './clientes.css'

function Clientes() {

    const data = [
        {'nome': 'Daniel','cpf': '12345678910', 'pago': 'Sim'},
        {'nome': 'Jose','cpf': '12345678910', 'pago': 'Nao'},
        {'nome': 'Marina','cpf': '12345678910', 'pago': 'Sim'},
        {'nome': 'Luan','cpf': '12345678910', 'pago': 'Sim'},
        {'nome': 'Rafael','cpf': '12345678910', 'pago': 'Nao'}
    ]

    return (
        <div className='entire-page-clientes'>
            <header className='header-clientes'>
                <TituloMedio title="Clientes" />
            </header>
            <body className='body-clientes'>
                <ClientList data={data} />
            </body>
            <BotaoVoltar path="/menu/gerenciamento" />
        </div>
    )
}

export default Clientes;