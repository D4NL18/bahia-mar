import React, { useEffect } from "react";

import TituloGrande from "../../../components/titulo/titulo-grande/tituloGrande";
import Subtitulo from "../../../components/titulo/subtitulo/subtitulo";
import BotaoGrande from "../../../components/botao/botao-grande/botaoGrande";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

import "./menuColaborador.css";
import { testarEhAdmin, testarLogin } from "../../../services/api";
import { useNavigate } from "react-router-dom";

function Menu() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!testarLogin(navigate)) return;
    testarEhAdmin(navigate);
  }, [navigate]);

  return (
    <div className="entire-page-menu">
      <section className="title-section-menu">
        <TituloGrande title="Cadastrar Usuário" />
        <Subtitulo subtitle="Selecione o que deseja cadastrar" />
      </section>
      <section className="caixa-central-section-menu">
        <BotaoGrande
          text="Administrador"
          path="/menu/cadastros/colaborador/administrador"
        />
        <BotaoGrande
          text="Funcionário"
          path="/menu/cadastros/colaborador/funcionario"
        />
      </section>
      <div className="title-section-menu" style={{ visibility: "hidden" }}>
        <TituloGrande title="a" />
        <Subtitulo subtitle="a" />
      </div>
      <BotaoVoltar path="/menu/cadastros" />
    </div>
  );
}

export default Menu;
