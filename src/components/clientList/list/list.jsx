import React, { useState }from 'react'

import Item from '../item/item';
import SearchBar from '../../searchBar/searchBar'

import './list.css'


function List(props) {

    return (
        <div>
            <SearchBar  />
            {props.data.map((op, key) =>
                <Item key={key} nome={op.nome} isPago={op.pago} cpf={op.cpf} />)
            }
        </div>
    )
}

export default List;