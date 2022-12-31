import React from 'react';

function Market(props) { 
    const handlerOnClickMarket = (e) => { 
        e.preventDefault() 
        
        props.setMarket(props.market)
    }
    return(
        <li
            id = {props.market.market}
            onClick = {handlerOnClickMarket}
        >
            <div className = "market">
                <div className = "korean-name">{props.market.korean_name}</div>
                <div className = "short-name">{props.market.market}</div>
            </div>
        </li>
    )
}

export default Market