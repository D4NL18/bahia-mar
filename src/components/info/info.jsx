import React from 'react'

import './info.css'

function Info(props) {
    return(
        <div className='entire-info'>
            <h3 className='label-info'>{props.label}</h3>
            <h4 className='desc-info'>{props.desc}</h4>
        </div>
    )
}

export default Info