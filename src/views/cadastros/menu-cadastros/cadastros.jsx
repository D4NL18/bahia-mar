import React, { useEffect } from "react";

import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import Subtitulo from "../../../components/titulo/subtitulo/subtitulo";
import BotaoGrande from "../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

import "./cadastros.css";
import { useNavigate } from "react-router-dom";
import { testarEhAdmin, testarLogin } from "../../../services/api";

function Cadastros() {
  const navigate = useNavigate();

  useEffect(() => {
    testarLogin(navigate);
    testarEhAdmin(navigate);
  }, [navigate]);

  return (
    <div className="entire-page-cadastros">
      <section className="title-section-cadastros">
        <TituloMedio title="Cadastros" />
        <Subtitulo subtitle="Selecione o que deseja cadastrar ou modificar" />
      </section>
      <section className="caixa-central-section-cadastros">
        <div className="div-botoes-cadastros">
          <BotaoGrande
            text="Colaborador"
            path="/menu/cadastros/colaborador"
            style={{ marginTop: 0 }}
          />
          <BotaoGrande
            text="Opção de Pagamento"
            path="/menu/cadastros/metodo"
          />
          <BotaoGrande text="Cliente" path="/menu/cadastros/cliente" />
        </div>
        <div className="div-botoes-cadastros">
          <BotaoGrande
            text="Produto"
            path="/menu/cadastros/produto"
            style={{ marginTop: 0 }}
          />
          <BotaoGrande text="Veículo" path="/menu/cadastros/veiculo" />
          <BotaoGrande text="Venda" path="/menu/cadastros/venda" />
        </div>
      </section>
      <section
        className="title-section-cadastros"
        style={{ visibility: "hidden" }}
      >
        <TituloMedio title="Cadastros" />
        <Subtitulo subtitle="Selecione o que deseja cadastrar ou modificar" />
      </section>
      <BotaoVoltar path="/menu" />
    </div>
  );
}

export default Cadastros;
