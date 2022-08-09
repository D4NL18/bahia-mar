import React from "react";

import TituloMedio from "../../components/titulo/titulo-medio/tituloMedio";
import Subtitulo from "../../components/titulo/subtitulo/subtitulo";
import BotaoGrande from "../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../components/botao/botao-voltar/botaoVoltar";

import "./cadastros.css";

function Cadastros() {
  return (
    <div className="entire-page-cadastros">
      <section className="title-section-cadastros">
        <TituloMedio title="Cadastros" />
        <Subtitulo subtitle="Selecione o que deseja cadastrar ou modificar" />
      </section>
      <section className="caixa-central-section-cadastros">
        <section
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <div style={{ margin: "0 2rem" }}>
            <BotaoGrande
              text="Administrador"
              path="/menu/cadastros/administrador"
            />
            <BotaoGrande
              text="Motorista"
              path="/menu/cadastros/motorista"
              style={{ marginBottom: "0" }}
            />
            <BotaoGrande 
              text="Cliente" 
              path="/menu/cadastros/cliente"
            />
          </div>
          <div style={{ margin: "0 2rem" }}>
            <BotaoGrande text="Produto" path="/menu/cadastros/produto" />
            <BotaoGrande
              text="Veículo"
              path="/menu/cadastros/veiculo"
              style={{ marginBottom: "0" }}
            />
            <BotaoGrande 
              text="Venda" 
              path="/menu/cadastros/venda"
            />
          </div>
          
        </section>
        
      </section>
      <BotaoVoltar path="/menu" />
    </div>
  );
}

export default Cadastros;
