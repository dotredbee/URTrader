import React, { memo, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Markets from './SearchBar/Markets';
function SearchBar(props) {
    let searchRef = useRef("")
    const [ search, setSearch ] = useState("")
    const [ toggle, setToggle ] = useState(true)

    const onSearchFocus = () => {
        setToggle(false)
    }
    
    const onSearchBlur = () => {
        if(searchRef.current.value.length === 0) {
            setToggle(true)
        }
    }
    return(
        <div className = "search-wrap">
            <div className = "search-input">
                <div className = "wrap">
                    <label 
                        className = {toggle === true ? "search-icon" : "search-icon active"}
                        htmlFor='name'>
                        <FontAwesomeIcon icon = {faSearch} />
                    </label>
                    <input 
                        ref = { searchRef }
                        type = "text" 
                        onKeyUp = {() => {
                            let input = searchRef.current.value

                            setTimeout(() => {
                                if(input === searchRef.current.value) setSearch(input)
                            }, 150)
                        }}
                        onFocus = {onSearchFocus}
                        onBlur = {onSearchBlur}    
                    />
                </div>
            </div>
            <div className = "markets">
                <Markets search = {search} setMarket = {props.setMarket} />
            </div>
        </div>
    )
}

export default memo(SearchBar);
