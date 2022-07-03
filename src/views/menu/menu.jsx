import React from "react";

import TituloMedio from "../../components/titulo/titulo-medio/tituloMedio";
import Subtitulo from "../../components/titulo/subtitulo/subtitulo";
import BotaoGrande from "../../components/botao/botao-grande/botaoGrande";
import BotaoSair from "../../components/botao/botao-sair/botaoSair";

import "./menu.css";

function Menu() {
  return (
    <div className="entire-page-menu">
      <section className="title-section-menu">
        <TituloMedio title="Menu" />
        <Subtitulo subtitle="Selecione o que deseja fazer" />
      </section>
      <section className="caixa-central-section-menu">
        <BotaoGrande text="Estatísticas" path="/menu/estatisticas" />
        <BotaoGrande text="Cadastros" path="/menu/cadastros" />
      </section>
      <BotaoSair />
    </div>
  );
}

export default Menu;
