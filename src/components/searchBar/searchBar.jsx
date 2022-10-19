import React from 'react'
import SearchIcon from '@mui/icons-material/Search';

import './searchBar.css'

function SearchBar(props) {

    return (
        <div className='entire-searchBar'>
            <input
                type="text"
                className='searchBar' />
                <div className='icon-div-searchBar'>
                <SearchIcon fontSize='large' />
                </div>
        </div>
    )
}

export default SearchBar;