import React, { useState } from 'react'

import './searchBar.css'

function SearchBar(props) {

    return (
        <div className='entire-searchBar'>
            <input
                type="text"
                className='searchBar' />
            <div className='icon-searchBar' />
        </div>
    )
}

export default SearchBar;