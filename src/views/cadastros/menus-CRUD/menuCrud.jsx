import TituloMedio from "../../../components/titulo/titulo-medio/tituloMedio";
import Subtitulo from "../../../components/titulo/subtitulo/subtitulo";
import BotaoMedio from "../../../components/botao/botao-medio/botaoMedio";
import BotaoVoltar from "../../../components/botao/botao-voltar/botaoVoltar";
import ModalProduto from "../../../components/modais/modal-pequeno/modalPequeno";
import ModalSelect from "../../../components/modais/modal-select/modalSelect";

import "./menuCrud.css";

function App(props) {
  //temp
  const options = ["a", "b", "c", "d"];

  return (
    <div className="entire-page-menuCrud">
      <section className="title-section-menuCrud">
        <TituloMedio title={props.tipo} />
        <Subtitulo subtitle="Selecione o que deseja fazer" />
      </section>
      <section className="botoes-section-menuCrud">
        <ModalSelect acao="Apagar" tipo={props.tipo} options={options} />
        <ModalSelect acao="Editar" tipo={props.tipo} options={options} />
        {/* <BotaoMedio text={`Apagar ${props.tipo}`} />
        <BotaoMedio text={`Editar ${props.tipo}`} /> */}
        {props.tipo === "Administrador" ||
        props.tipo === "Motorista" ||
        props.tipo === "Veiculo" ||
        props.tipo === "Cliente" ? (
          <BotaoMedio
            text={`Cadastrar ${props.tipo}`}
            path={`cadastrar`}
            tipo={props.tipo}
          />
        ) : (
          <ModalProduto tipo={props.tipo} />
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
          props.tipo !== "Administrador" && props.tipo !== "Motorista"
            ? "/menu/cadastros"
            : "/menu/cadastros/funcionario"
        }
      />
    </div>
  );
}

export default App;
