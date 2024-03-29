import "./gerenciamento.css";

import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import Subtitulo from "../../../components/titulo/subtitulo/subtitulo";
import BotaoMedio from "../../../components/botao/botao-medio/botaoMedio";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { testarEhAdmin, testarLogin } from "../../../services/api";

export const salesDats = undefined;

function Estatisticas() {
  const navigate = useNavigate();

  useEffect(() => {
    /*setAguardandoAsync(true);
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/obter-vendas`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.status !== 200) {
          console.log((await res.json()).message); //mensagem de erro
          // mostrar mensagem de erro...
        } else {
          // deu bom, proseguir...
          console.log(await res.json());
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      })
      .finally(() => setAguardandoAsync(false));*/

    if (!testarLogin(navigate)) return;
    testarEhAdmin(navigate);
  }, [navigate]);

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
          <BotaoMedio
            text="Tabela de Preços"
            path="/menu/gerenciamento/precos"
            tipo="Gerenciamento"
          />
        </section>
        <section className="coluna-estatisticas">
          <BotaoMedio
            text="Funcionários"
            path="/menu/gerenciamento/funcionarios"
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
