import React, { useState } from "react";
import Modal from "react-modal";

import InputPequeno from "../../input/input-pequeno/inputPequeno";
import BotaoMedio from "../../botao/botao-medio/botaoMedio";
import TituloPequeno from "../../titulo/titulo-pequeno/tituloPequeno";
import { getTokenSessao, handleErrorBackend } from "../../../services/api";
import { useNavigate } from "react-router-dom";

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

  function handleSubmit(event) {
    event.preventDefault();
    if (aguardandoAsync) return;

    setAguardandoAsync(true);
    let body = { name: nome.trim() };
    body.id = props.editInfo ? props.editInfo["ID"] : undefined;
    if (props.tipo === "produtos")
      try {
        body.value = Number(preco.replace(",", "."));
      } catch {
        alert("Preço inválido");
        return;
      }

    fetch(
      `${process.env.REACT_APP_BACKEND_ROUTE}/${props.tipo}/${
        estahRegistrando ? "inserir" : "editar"
      }/${getTokenSessao()}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          handleErrorBackend(navigate, res.error);
        } else {
          alert("Sucesso");
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

  console.log(props);
  return (
    <div>
      <button
        className="botao-medio"
        onClick={() => {
          if (props.acao === "Editar" && !props.editInfo) return;

          setModalOpen(true);
          setNome(estahRegistrando ? "" : props.editInfo["NOME"]);
          setPreco(
            estahRegistrando ? "" : props.editInfo["PRECO"]?.replace(".", ",")
          );
        }}
      >
        <p className="texto-botao-medio">{`${props.acao || "Cadastrar"} ${
          props.rotulo
        }`}</p>
      </button>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <TituloPequeno title={`${props.acao || "Cadastrar"} ${props.rotulo}`} />
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
          {props.tipo === "produtos" && (
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
