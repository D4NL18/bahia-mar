import React, { useState } from 'react'

import TituloPequeno from '../../../../components/titulo/titulo-pequeno/tituloPequeno';
import Info from '../../../../components/info/info'
import Linha from '../../../../components/grafico/linha/linha';
import BotaoVoltar from '../../../../components/botao/botao-voltar/botaoVoltar';

import './perfilCliente.css'

function PerfilCliente() {

    const infos = {
        nome: 'Daniel Marinho',
        faturamento: '1559,94',
        pessoa: 'Física',
        telefone: '71991269995',
        cpfcnpj: '85795538574',
        cep: '41650710',
        cidade: 'Salvador',
        bairro: 'piata',
        rua: 'Fernando Leite Mendes',
        numero: '208',
        complemento: 'dfsafsafdsaf'
    }

    const data = [
        { id: 1, year: 2016, userGain: 8000, orders: 20 },
        { id: 2, year: 2017, userGain: 18000, orders: 27 },
        { id: 3, year: 2018, userGain: 9000, orders: 25 },
        { id: 4, year: 2019, userGain: 14000, orders: 32 }
    ]

    const [faturamento] = useState({
        labels: data.map((data) => data.year),
        datasets: [{
            label: "Faturamento",
            data: data.map((data) => data.userGain),
            borderColor: 'black',
        }],
    })

    const [pedidos] = useState({
        labels: data.map((data) => data.year),
        datasets: [{
            label: "Faturamento",
            data: data.map((data) => data.orders),
            borderColor: 'black',
        }],
    })

    return (
        <div className='entire-page-perfilCliente'>
            <body className='painel-cliente'>
                <section className='section-infos-cliente'>
                    <TituloPequeno title={infos.nome} />
                    <div className='colunas-info-cliente'>
                        <div className='coluna-infos-cliente'>
                            <Info label="Faturamento" desc={infos.faturamento} />
                            <Info label="Física/Jurídica" desc={infos.pessoa} />
                            <Info label="Telefone" desc={infos.telefone} />
                            <Info label="CPF/CNPJ" desc={infos.cpfcnpj} />
                            <Info label="CEP" desc={infos.cep} />
                        </div>
                        <div className='coluna-infos-cliente'>
                            <Info label="Cidade" desc={infos.cidade} />
                            <Info label="Bairro" desc={infos.bairro} />
                            <Info label="Rua" desc={infos.rua} />
                            <Info label="Número" desc={infos.numero} />
                            <Info label="Complemento" desc={infos.complemento} />
                        </div>
                    </div>
                </section>
                <section className='section-grafico-cliente'>
                    <div className='caixa-grafico-cliente'>
                        <h3 className='titulo-grafico-cliente'>Faturamento Anual</h3>
                        <Linha chartData={faturamento} />
                    </div>
                    <div className='caixa-grafico-cliente' style={{marginBottom: '1rem'}}>
                        <h3 className='titulo-grafico-cliente'>Pedidos Anuais</h3>
                        <Linha chartData={pedidos} />
                    </div>
                </section>
            </body>
            <BotaoVoltar path="/menu/gerenciamento/clientes" />
        </div>
    )
}

export default PerfilCliente;