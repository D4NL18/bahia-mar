import React from "react";

import TituloMedio from "../../components/titulo/titulo-medio/tituloMedio";
import Subtitulo from "../../components/titulo/subtitulo/subtitulo";
import BotaoMedio from '../../components/botao/botao-medio/botaoMedio'
import BotaoVoltar from '../../components/botao/botao-voltar/botaoVoltar'
import ModalProduto from '../../components/modais/modal-produto/modalProduto'

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
        {
        props.tipo === "Administrador" || props.tipo === "Motorista" || props.tipo === "Veiculo"
        ? 
        <BotaoMedio text={`Cadastrar ${props.tipo}`} path={`cadastrar`} />
        :
        <ModalProduto tipo={props.tipo} />
        }
        
      </section>
      <section className="title-section-menuCrud" style={{visibility: 'hidden'}} >
        <TituloMedio title={props.tipo} />
        <Subtitulo subtitle="Selecione o que deseja fazer" />
      </section>
      <BotaoVoltar path="/menu" />
    </div>
  );
}

export default App;
