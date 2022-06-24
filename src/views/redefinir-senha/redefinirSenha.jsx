import React from 'react'

import TituloGrande from '../../components/titulo-grande/tituloGrande'
import InputGrande from '../../components/input-grande/inputGrande'
import BotaoGrande from '../../components/botao-grande/botaoGrande'
import BotaoVoltar from '../../components/botao-voltar/botaoVoltar'

import './redefinirSenha.css';

function App() {
    return (
        <div className='entire-page-redefinirSenha'>
            <section className='title-section-redefinirSenha'>
                <TituloGrande title="Redefinir Senha" />
            </section>
            <section className="caixa-central-section-redefinirSenha">
                <InputGrande label="E-mail" type="text" />
                <BotaoGrande text="Enviar E-mail" path="" />
                <p className="texto-alerta-redefinirSenha">
                    Atenção! Entre no endereço de email informado para prosseguir com a redefinição de senha
                </p>
            </section>
            <BotaoVoltar path="/" />
        </div>
    );
}

export default App;
