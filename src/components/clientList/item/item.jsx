import React from 'react'

import './item.css'

function Item(props) {
    return (
        <button className='entire-item'>
            <div className='div-nome-item'>
                <h3 className='texto-item'>Nome: {props.nome}</h3>
                <h3 className='texto-item'>CPF: {props.cpf}</h3>
                <h3 className='texto-item'>Status:</h3>
            </div>
            <div className='div-pago-item' >
                <div className='cor-pago-item' style={{backgroundColor: (props.isPago === 'Sim') ? 'green' : 'red'}} />
            </div>
        </button>
    )
}

export default Item;