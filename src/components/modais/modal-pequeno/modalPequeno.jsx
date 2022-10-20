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
  const [isModalOpen, setModalOpen] = useState(false);
  const [estahRegistrando, setEstahRegistrando] = useState(false);

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");

  function afterOpenModal() {}

  function closeModal() {
    setModalOpen(false);
  }

  function retornaPreco() {
    if (props.tipo === "Produto") {
      return (
        <InputPequeno
          label="Preço"
          inputProps={{ type: "text", required: true, maxLength: 50 }}
          state={preco}
          setState={setPreco}
        />
      );
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (estahRegistrando) return;

    setEstahRegistrando(true);
    // todo: mudar rota dependendo do que está inserindo
    fetch(`${process.env.REACT_APP_BACKEND_ROUTE}/inserir-metodo-pagamento`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nome.trim().toLocaleLowerCase(),
      }),
    })
      .then(async (res) => {
        if (res.status !== 200) {
          console.log((await res.json()).message); //mensagem de erro
          // mostrar mensagem de erro...
        } else {
          // deu bom, proseguir...
        }
      })
      .catch((err) => {
        // mostrar mensagem de erro...
        console.log(err);
      })
      .finally(() => {
        setNome("");
        setEstahRegistrando(false);
        setModalOpen(false);
      });
  }

  return (
    <div>
      <button
        className="botao-medio"
        onClick={() => {
          setModalOpen(true);
        }}
      >
        <p className="texto-botao-medio">{`Cadastrar ${props.tipo}`}</p>
      </button>
      <Modal
        isOpen={isModalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <TituloPequeno title={`Criar ${props.tipo}`} />
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
          {retornaPreco()}

          <BotaoMedio text="Cadastrar" type="submit" />
        </form>
      </Modal>
    </div>
  );
}

export default App;
