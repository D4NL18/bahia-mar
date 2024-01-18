import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import Subtitulo from "../../../components/titulo/subtitulo/subtitulo";
import BotaoMedio from "../../../components/botao/botao-medio/botaoMedio";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";
import ModalProduto from "../../../components/modais/modal-pequeno/modalPequeno";
import ModalSelect from "../../../components/modais/modal-select/modalSelect";

import "./menuCrud.css";
import { useEffect } from "react";
import { testarEhAdmin, testarLogin } from "../../../services/api";
import { useNavigate } from "react-router-dom";

function App(props) {
  const navigate = useNavigate();
  useEffect(() => {
    if (!testarLogin(navigate)) return;
    testarEhAdmin(navigate);
  }, [navigate]);

  //console.log(props.tipo);
  return (
    <div className="entire-page-menuCrud">
      <section className="title-section-menuCrud">
        <TituloMedio title={props.titulo} />
        <Subtitulo subtitle="Selecione o que deseja fazer" />
      </section>
      <section className="botoes-section-menuCrud">
        <ModalSelect acao="Apagar" {...props} />
        <ModalSelect acao="Editar" {...props} />
        {/* <BotaoMedio text={`Apagar ${props.tipo}`} />
        <BotaoMedio text={`Editar ${props.tipo}`} /> */}
        {props.tipo === "funcionarios" ||
        props.tipo === "veiculos" ||
        props.tipo === "clientes" ? (
          <BotaoMedio
            text={`Cadastrar ${props.rotulo}`}
            path={"cadastrar"}
            {...props}
          />
        ) : (
          <ModalProduto {...props} />
        )}
      </section>
      <section
        className="title-section-menuCrud"
        style={{ visibility: "hidden" }}
      >
        <TituloMedio title={props.tipo} />
        <Subtitulo subtitle="Selecione o que deseja fazer" />
      </section>
      <BotaoVoltar
        path={
          props.tipo !== "Administrador" && props.tipo !== "Colaborador"
            ? "/menu/cadastros"
            : "/menu/cadastros/colaborador"
        }
      />
    </div>
  );
}

export default App;
