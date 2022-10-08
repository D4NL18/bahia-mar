import "./gerenciamento.css";

import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import Subtitulo from "../../../components/titulo/subtitulo/subtitulo";
import BotaoMedio from "../../../components/botao/botao-medio/botaoMedio";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";

function Estatisticas() {
  return (
    <div className="entire-page-estatisticas">
      <section className="title-section-estatisticas">
        <TituloMedio title="Estatísticas" />
        <Subtitulo subtitle="Selecione o que deseja visualizar" />
      </section>
      <section className="caixa-central-section-estatisticas">
        <section>
          <BotaoMedio
            text="Todas as Vendas do Dia"
            path="/menu/gerenciamento/vendas-dia"
          />
          <BotaoMedio
            text="Faturamento por Funcionário / Dia"
            path="/menu/gerenciamento/faturamento-funcionario-dia"
          />
          <BotaoMedio
            text="Faturamento do Dia"
            path="/menu/gerenciamento/faturamento-dia"
          />
          <BotaoMedio
            text="Venda de Produtos / Dia"
            path="/menu/gerenciamento/venda-produtos-dia"
            style={{ marginBottom: "0" }}
          />
          <BotaoMedio
            text="Tabela de Preços"
            path="/menu/gerenciamento/venda-produtos-mes"
            style={{ marginBottom: "0" }}
          />
          <BotaoMedio
            text="Lista de Clientes"
            path="/menu/gerenciamento/clientes"
            style={{ marginBottom: "0" }}
          />
          
        </section>
        <section>
          <BotaoMedio
            text="Todas as Vendas do Mês"
            path="/menu/gerenciamento/venda-mes"
          />
          <BotaoMedio
            text="Faturamento por Funcionário / Mês"
            path="/menu/gerenciamento/faturamento-funcionario-mes"
          />
          <BotaoMedio
            text="Faturamento do Mês"
            path="/menu/gerenciamento/faturamento-mes"
          />
          <BotaoMedio
            text="Venda de Produtos / Mês"
            path="/menu/gerenciamento/venda-produtos-mes"
            style={{ marginBottom: "0" }}
          />
          <BotaoMedio
            text="Controle de Débito"
            path="/menu/gerenciamento/debito"
            style={{ marginBottom: "0" }}
          />
          <BotaoMedio
            text="Controle de Estoque"
            path="/menu/gerenciamento/estoque"
            style={{ marginBottom: "0" }}
          />
        </section>
        
      </section>
      
      <BotaoVoltar path="/menu" />
    </div>
  );
}

export default Estatisticas;
