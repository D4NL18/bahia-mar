import React from "react";

import TituloMedio from "../../components/titulo/titulo-medio/tituloMedio";
import Subtitulo from "../../components/titulo/subtitulo/subtitulo";
import BotaoMedio from '../../components/botao/botao-medio/botaoMedio'
import BotaoVoltar from '../../components/botao/botao-voltar/botaoVoltar'

import "./menuCrud.css";

function App(props) {
  return (
    <div className="entire-page-menuCrud">
      <section className="title-section-menuCrud" >
        <TituloMedio title={props.tipo} />
        <Subtitulo subtitle="Selecione o que deseja fazer" />
      </section>
      <section className="botoes-section-menuCrud">
        <BotaoMedio text={`Apagar ${props.tipo}`} />
        <BotaoMedio text={`Editar ${props.tipo}`} />
        <BotaoMedio text={`Cadastrar ${props.tipo}`} />
      </section>
      <BotaoVoltar path="/menu" />
    </div>
  );
}

export default App;
