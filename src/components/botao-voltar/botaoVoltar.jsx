import React from 'react'
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './botaoVoltar.css';

function BotaoGrande(props) {
    const navigate = useNavigate();

    function handleClick() {
        navigate(`${props.path}`)
    }

    return (
        <button className="botao-voltar" onClick={handleClick}>
            <ArrowBackIcon className='seta-bota-voltar' />
        </button>
    );
}

export default BotaoGrande;