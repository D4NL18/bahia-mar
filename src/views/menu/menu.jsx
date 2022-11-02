import React from "react";

import TituloGrande from "../../components/titulo/titulo-grande/tituloGrande";
import Subtitulo from "../../components/titulo/subtitulo/subtitulo";
import BotaoGrande from "../../components/botao/botao-grande/botaoGrande";
import BotaoSair from "../../components/botao/botao-sair/botaoSair";

import "./menu.css";

function Menu() {
  return (
    <div className="entire-page-menu">
      <section className="title-section-menu">
        <TituloGrande title="Menu" />
        <Subtitulo subtitle="Selecione o que deseja fazer" />
      </section>
      <section className="caixa-central-section-menu">
        <BotaoGrande text="Relatórios" path="/menu/gerenciamento" />
        <BotaoGrande text="Cadastros" path="/menu/cadastros" />
      </section>
      <div className="title-section-menu" style={{visibility: 'hidden'}}>
      <TituloGrande title="a"  />
      <Subtitulo subtitle="a" />
      </div>
      <BotaoSair />
    </div>
  );
}

export default Menu;
