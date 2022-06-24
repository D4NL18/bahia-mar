import React from 'react'

import TituloGrande from '../../components/titulo/titulo-grande/tituloGrande'
import InputGrande from '../../components/input/input-grande/inputGrande'
import BotaoGrande from '../../components/botao/botao-grande/botaoGrande'
import BotaoVoltar from '../../components/botao/botao-voltar/botaoVoltar'

import './redefinirSenha2.css';

function App() {
    return (
        <div className='entire-page-redefinirSenha2'>
            <section className='title-section-redefinirSenha2'>
                <TituloGrande title="Redefinir Senha" />
            </section>
            <section className="caixa-central-section-redefinirSenha2">
                <InputGrande label="Nova Senha" type="password" />
                <InputGrande label="Confirmar nova senha" type="password" />
                <BotaoGrande text="Redefinir Senha" path="" />
            </section>
            <BotaoVoltar path="/" />
        </div>
    );
}

export default App;
