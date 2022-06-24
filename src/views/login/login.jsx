import React from 'react'

import TituloGrande from '../../components/titulo-grande/tituloGrande'
import InputGrande from '../../components/input-grande/inputGrande'
import BotaoGrande from '../../components/botao-grande/botaoGrande'

import './login.css';

function App() {
  return (
    <div className='entire-page-login'>
      <section className='title-section-login'>
        <TituloGrande title="Bahia Mar" />
      </section>
      <section className="caixa-central-section-login">
        <InputGrande label="E-mail" type="text" />
        <InputGrande label="Senha" type="password" />
        <BotaoGrande text="Entrar" />
        <a className="texto-redefinir-senha-login" href="/redefinir-senha">
          Esqueceu sua senha? Clique aqui para recuperá-la
        </a>
      </section>
    </div>
  );
}

export default App;
