import React, { useState } from "react";
import Detail from "../Components/Trade/Detail";
import Order from "../Components/Trade/Order";
import OrderBooks from "../Components/Trade/OrderBooks";
import SearchBar from "../Components/Trade/SearchBar";

function Trade(props) {
    const [ market, setMarket ] = useState({}) 
    console.log(market)
    return (
        <div id="trade" className="container">
            <div className = "left">
                <Order market = {market}/>
            </div>
            <div className = "right">
                <div className = "wrap">
                    <Detail market = {market}/>
                    <div className = "bottom">
                        <SearchBar  setMarket = { setMarket }/>
                        <OrderBooks market = {market}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Trade;
