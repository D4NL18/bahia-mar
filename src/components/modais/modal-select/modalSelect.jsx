import React, { useState } from "react";
import Modal from "react-modal";

import SelectPequeno from "../../input/select-pequeno/selectPequeno";
import BotaoMedio from "../../botao/botao-medio/botaoMedio";
import TituloPequeno from "../../titulo/titulo-pequeno/tituloPequeno";

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
  const [isModalOpen, setModalOpen] = useState(false);
  const [info, setInfo] = useState();
  const [infoSelecionada, setInfoSelecionada] = useState();

  function obterRotaInfo() {
    switch (props.tipo) {
      case "Cliente":
        return "obter-clientes";
      case "Método de Pagamento":
        return "obter-metodos-pagamento";
      case "Administrador":
        return "obter-adms";
      case "Motorista":
        return "obter-motoristas";
      default:
        return "";
    }
  }
  function obterRotaDelete() {
    switch (props.tipo) {
      case "Cliente":
        return "remover-cliente";
      case "Método de Pagamento":
        return "remover-metodo-pagamento";
      case "Administrador":
      case "Motorista":
        return "remover-funcionario";
      default:
        return "";
    }
  }
  function obterOpcsSelect() {
    if (!info || info.length === 0) return [];

    let opcs;
    switch (props.tipo) {
      case "Cliente":
        opcs = info.map(
          (cliente) => `${cliente["NOME"]} - ${cliente["CPF_CNPJ"]}`
        );
        break;
      case "Método de Pagamento":
        opcs = info.map((metodoPagamento) => metodoPagamento["NOME"]);
        break;
      case "Administrador":
        opcs = info.map((adm) => `${adm["NOME"]} - ${adm["CPF"]}`);
        break;
      case "Motorista":
        opcs = info.map(
          (motorista) => `${motorista["NOME"]} - ${motorista["CPF"]}`
        );
        break;
      default:
        opcs = [];
    }

    if (!infoSelecionada) setInfoSelecionada(opcs[0]);
    return opcs;
  }

  async function obterInfo() {
    const res = await fetch(
      `${process.env.REACT_APP_BACKEND_ROUTE}/${obterRotaInfo()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    return await res.json();
  }

  function afterOpenModal() {
    obterInfo().then((info) => setInfo(info));
  }

  function closeModal() {
    setModalOpen(false);
    setInfo(undefined);
  }

  function handleSubmit(event) {
    event.preventDefault();

    let body;
    switch (props.tipo) {
      case "Cliente":
        const cpfCnpj = infoSelecionada.split(" - ")[1];
        const cliente = info.find((c) => c["CPF_CNPJ"] === cpfCnpj);
        body = JSON.stringify({
          id: cliente["ID_CLIENTE"],
        });
        break;
      case "Método de Pagamento":
        body = JSON.stringify({
          name: infoSelecionada,
        });
        break;
      case "Administrador":
      case "Motorista":
        body = JSON.stringify({
          cpf: infoSelecionada.split(" - ")[1],
        });
        break;
      default:
    }

    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/${obterRotaDelete()}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body,
    }).then(async (res) => {
      if (res.status !== 200) {
        console.log((await res.json()).message); //mensagem de erro
        // mostrar mensagem de erro...
      } else {
        // deu bom, proseguir...
      }
    });
  }

  console.log(props.tipo);
  return (
    <div>
      <button
        className="botao-medio"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <p className="texto-botao-medio">{`${props.acao} ${props.tipo}`}</p>
      </button>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {info ? (
          <>
            <TituloPequeno title={`Selecione o ${props.tipo}`} />
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
                label={props.tipo}
                options={obterOpcsSelect()}
              />
              <BotaoMedio text={`${props.acao}`} type="submit" />
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
