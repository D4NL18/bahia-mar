import React from 'react'

import './botaoGrande.css';

function BotaoGrande(props) {
    return (
        <button className="botao-grande">
            <p className="texto-botao-grande">{props.text}</p>
        </button>
    );
}

export default BotaoGrande;