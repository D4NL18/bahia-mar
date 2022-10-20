import React, { useState } from 'react';
import Modal from 'react-modal';

import InputPequeno from '../../input/input-pequeno/inputPequeno';
import BotaoMedio from '../../botao/botao-medio/botaoMedio';
import TituloPequeno from '../../titulo/titulo-pequeno/tituloPequeno';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
};

function App(props) {

    const [isModalOpen, setModalOpen] = useState(false)
    const [nome, setNome] = useState("");
    const [preco, setPreco] = useState("")

    function afterOpenModal() {
    }

    function closeModal() {
        setModalOpen(false)
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
            )
        }
    }

    return (
        <div>
            <button
                className="botao-medio"
                onClick={() => { setModalOpen(true) }}
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
                <form style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <InputPequeno
                        label="Nome"
                        inputProps={{ type: "text", required: true, maxLength: 50 }}
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