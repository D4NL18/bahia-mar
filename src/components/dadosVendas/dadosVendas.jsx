import React from 'react'

import './dadosVendas.css'

function dadosVendas(props) {
    return (
        <div className='entire-dadosVendas'>
            <label className='label-dadosVendas'>
                {props.label}
            </label>
            <div className='box-dadosVendas'>
                <p className='infos-dadosVendas'>
                    {props.info}
                </p>
            </div>
        </div>
    )
}

export default dadosVendas