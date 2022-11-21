import React, { useState } from "react";
import Modal from "react-modal";

import InputPequeno from "../../input/input-pequeno/inputPequeno";
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
  const estahRegistrando = !props.editInfo;
  const [isModalOpen, setModalOpen] = useState(false);
  const [aguardandoAsync, setAguardandoAsync] = useState(false);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  console.log(props.editInfo);

  function afterOpenModal() {}

  function closeModal() {
    setModalOpen(false);
  }

  function obterRota() {
    switch (props.tipo) {
      case "Produto":
        return props.editInfo ? "editar-produto" : "inserir-produto";
      case "Opção de Pagamento":
        return props.editInfo
          ? "editar-metodo-pagamento"
          : "inserir-metodo-pagamento";
      default:
        return "";
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (aguardandoAsync) return;

    setAguardandoAsync(true);
    let body = { name: nome.trim() };
    body.id = props.editInfo ? props.editInfo["ID"] : undefined;
    if (props.tipo === "Produto")
      try {
        body.value = Number(preco.replace(",", "."));
      } catch {
        throw new Error("Preço inválido");
      }

    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/${obterRota()}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(async (res) => {
        if (res.status !== 200) {
          console.log((await res.json()).message); //mensagem de erro
          // mostrar mensagem de erro...
        } else {
          // deu bom, proseguir...
          window.location.reload(false);
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      })
      .finally(() => {
        setNome("");
        setPreco("");
        setAguardandoAsync(false);
        setModalOpen(false);
      });
  }

  return (
    <div>
      <button
        className="botao-medio"
        onClick={() => {
          if (props.acao === "Editar" && !props.editInfo) return;

          setModalOpen(true);
          setNome(estahRegistrando ? "" : props.editInfo["NOME"]);
          setPreco(
            estahRegistrando ? "" : props.editInfo["PRECO"].replace(".", ",")
          );
        }}
      >
        <p className="texto-botao-medio">{`${props.acao || "Cadastrar"} ${
          props.tipo
        }`}</p>
      </button>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <TituloPequeno title={`${props.acao || "Cadastrar"} ${props.tipo}`} />
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          onSubmit={handleSubmit}
        >
          <InputPequeno
            label="Nome"
            inputProps={{ type: "text", required: true, maxLength: 30 }}
            state={nome}
            setState={setNome}
          />
          {props.tipo === "Produto" && (
            <InputPequeno
              label="Preço"
              inputProps={{ type: "text", required: true, maxLength: 8 }}
              state={preco}
              setState={setPreco}
            />
          )}

          <BotaoMedio text={`${props.acao || "Cadastrar"}`} type="submit" />
        </form>
      </Modal>
    </div>
  );
}

export default App;
