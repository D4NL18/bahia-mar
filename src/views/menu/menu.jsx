import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import TituloGrande from "../../components/titulo/titulo-grande/tituloGrande";
import Subtitulo from "../../components/titulo/subtitulo/subtitulo";
import BotaoGrande from "../../components/botao/botao-grande/botaoGrande";
import BotaoSair from "../../components/botao/botao-sair/botaoSair";

import "./menu.css";
import { getEhAdmin, testarLogin } from "../../services/api";

function Menu() {
  const navigate = useNavigate();
  const ehAdmin = getEhAdmin();

  useEffect(() => {
    testarLogin(navigate);
  }, [navigate]);

  return (
    <div className="entire-page-menu">
      <section className="title-section-menu">
        <TituloGrande title="Menu" />
        <Subtitulo subtitle="Selecione o que deseja fazer" />
      </section>
      <section className="caixa-central-section-menu">
        <BotaoGrande
          handleClick={() => {
            if (!ehAdmin) alert("Apenas Admins podem visualizar os relatórios");
            else navigate("/menu/gerenciamento");
          }}
          text="Relatórios"
          path="/menu/gerenciamento"
        />
        <BotaoGrande
          text={ehAdmin ? "Cadastros" : "Cadastrar venda"}
          path={`/menu/cadastros${ehAdmin ? "" : "/venda"}`}
        />
      </section>
      <div className="title-section-menu" style={{ visibility: "hidden" }}>
        <TituloGrande title="a" />
        <Subtitulo subtitle="a" />
      </div>
      <BotaoSair />
    </div>
  );
}

export default Menu;
