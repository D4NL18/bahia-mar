import "./gerenciamento.css";

import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import Subtitulo from "../../../components/titulo/subtitulo/subtitulo";
import BotaoMedio from "../../../components/botao/botao-medio/botaoMedio";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

function Estatisticas() {
  return (
    <div className="entire-page-estatisticas">
      <section className="title-section-estatisticas">
        <TituloMedio title="Relatórios" />
        <Subtitulo subtitle="Selecione o que deseja visualizar" />
      </section>
      <section className="caixa-central-section-estatisticas">
        <section className="coluna-estatisticas">
          <BotaoMedio
            text="Vendas"
            path="/menu/gerenciamento/vendas"
            tipo="Gerenciamento"
          />
          <BotaoMedio
            text="Controle de Estoque"
            path="/menu/gerenciamento/estoque"
            tipo="Gerenciamento"
          />
        </section>
        <section className="coluna-estatisticas">
          <BotaoMedio
            text="Tabela de Preços"
            path="/menu/gerenciamento/precos"
            tipo="Gerenciamento"
          />
          <BotaoMedio
            text="Clientes"
            path="/menu/gerenciamento/clientes"
            tipo="Gerenciamento"
          />
        </section>
        
      </section>
      
      <BotaoVoltar path="/menu" />
    </div>
  );
}

export default Estatisticas;
