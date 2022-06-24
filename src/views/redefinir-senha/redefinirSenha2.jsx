import React from 'react'

import TituloGrande from '../../components/titulo-grande/tituloGrande'
import InputGrande from '../../components/input-grande/inputGrande'
import BotaoGrande from '../../components/botao-grande/botaoGrande'
import BotaoVoltar from '../../components/botao-voltar/botaoVoltar'

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
