import { useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

import SelectPequeno from "../../input/select-pequeno/selectPequeno";
import BotaoMedio from "../../botao/botao-medio/botaoMedio";
import TituloPequeno from "../../titulo/titulo-pequeno/tituloPequeno";
import ModalPequeno from "../../../components/modais/modal-pequeno/modalPequeno";
import { getTokenSessao, handleErrorBackend } from "../../../services/api";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
};

function App(props) {
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [info, setInfo] = useState();
  const [infoSelecionada, setInfoSelecionada] = useState("Selecionar");

  function obterOpcsSelect() {
    if (!info || info.length === 0) {
      alert("Nenhuma cadastro encontrado");
      return closeModal();
    }

    let opcs;
    console.log(info);
    switch (props.tipo) {
      case "clientes":
        opcs = info.map(
          (cliente) => `${cliente["NOME"]} - ${cliente["CPF_CNPJ"]}`
        );
        break;
      case "opcoes-pag":
      case "produtos":
        opcs = info.map((i) => i["NOME"]);
        break;
      //case "Administrador":
      case "funcionarios":
        opcs = info.map((func) => `${func["NOME"]} - ${func["CPF"]}`);
        break;
      case "veiculos":
        opcs = info.map(
          (veiculo) => `${veiculo["MARCA"]} - ${veiculo["PLACA"]}`
        );
        break;
      default:
        opcs = [];
    }

    opcs.unshift("Selecionar");
    return opcs;
  }

  async function obterInfo() {
    let funcsSubPath = "";
    if (props.titulo === "Administradores") funcsSubPath = "-adms";
    else if (props.titulo === "Funcionários") funcsSubPath = "-motoristas";

    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_ROUTE}/${
        props.tipo
      }/obter${funcsSubPath}/${getTokenSessao()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    const jsonRes = await res.json();
    if (jsonRes.error) {
      handleErrorBackend(navigate, jsonRes.error);
    } else return jsonRes;
  }

  function afterOpenModal() {
    obterInfo().then((i) => setInfo(i));
  }

  function closeModal() {
    setModalOpen(false);
    setInfo(undefined);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!infoSelecionada || infoSelecionada === "Selecionar")
      return alert("Selecione uma opção");

    if (props.acao === "Apagar") {
      let body;
      switch (props.tipo) {
        case "clientes":
          const cpfCnpj = infoSelecionada.split(" - ")[1];
          const cliente = info.find((c) => c["CPF_CNPJ"] === cpfCnpj);
          body = JSON.stringify({
            id: cliente["ID"],
          });
          break;
        case "opcoes-pag":
        case "produtos":
          body = JSON.stringify({
            name: infoSelecionada,
          });
          break;
        case "funcionarios":
          body = JSON.stringify({
            cpf: infoSelecionada.split(" - ")[1],
          });
          break;
        case "veiculos":
          body = JSON.stringify({
            licensePlate: infoSelecionada.split(" - ")[1],
          });
          break;
        default:
      }

      fetch(
        `${process.env.REACT_APP_BACKEND_ROUTE}/${
          props.tipo
        }/remover/${getTokenSessao()}`,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body,
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            handleErrorBackend(navigate, res.error);
          } else {
            alert("Remoção concluída");
            setInfo(undefined);
            setInfoSelecionada(undefined);
            setModalOpen(false);
          }
        });
    } else if (props.acao === "Editar") {
      let state;
      let path, aux;
      switch (props.tipo) {
        case "funcionarios":
          path = `/menu/cadastros/colaborador/${
            props.titulo === "Administradores" ? "administrador" : "funcionario"
          }/cadastrar`;
          aux = infoSelecionada.split(" - ")[1];
          state = info.find((func) => func["CPF"] === aux);
          break;
        case "Funcionário":
          path = "/menu/cadastros/funcionario/Funcionário/cadastrar";
          aux = infoSelecionada.split(" - ")[1];
          state = info.find((func) => func["CPF"] === aux);
          break;
        case "clientes":
          path = "/menu/cadastros/cliente/cadastrar";
          aux = infoSelecionada.split(" - ")[1];
          state = info.find((cliente) => cliente["CPF_CNPJ"] === aux);
          break;
        case "veiculos":
          path = "/menu/cadastros/veiculo/cadastrar";
          aux = infoSelecionada.split(" - ")[1];
          state = info.find((veiculo) => veiculo["PLACA"] === aux);
          break;
        default:
      }

      if (path) navigate(path, { state });
    } else {
      alert("Falha ao tentar identificar ação escolhida");
    }
  }

  console.log(props.acao);
  return (
    <div>
      <button
        className="botao-medio"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <p className="texto-botao-medio">{`${props.acao} ${props.rotulo}`}</p>
      </button>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {info ? (
          <>
            <TituloPequeno title={`Selecione o(a) ${props.rotulo}`} />
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
              onSubmit={handleSubmit}
            >
              <SelectPequeno
                state={infoSelecionada}
                setState={setInfoSelecionada}
                options={obterOpcsSelect()}
              />
              {props.acao === "Apagar" ? (
                <BotaoMedio text={`${props.acao}`} type="submit" />
              ) : (
                <ModalPequeno
                  acao="Editar"
                  {...props}
                  editInfo={info.find((v) => v["NOME"] === infoSelecionada)}
                />
              )}
            </form>
          </>
        ) : (
          <TituloPequeno title={`Obtendo dados...`} />
        )}
      </Modal>
    </div>
  );
}

export default App;
