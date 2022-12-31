import React, { memo, useEffect, useState, useMemo, useRef } from 'react';
import Market from './Market';

function Markets(props) { 
    const _unmount = useRef(false)
    const [ markets , setMarkets ] = useState([])
    useEffect(() => {
        _unmount.current = false 
        
        async function loadData() {
            const data = await window.ipcRenderer.invoke('markets', null)

            console.log(data)
            if(_unmount.current && !data.ok) return
            setMarkets(data.markets)
        }
        
        loadData()

        return () => _unmount.current = true
    }, [])
    
    const filter = useMemo(() => {
        const re = new RegExp(`\\W*${props.search.toUpperCase()}\\W*`)
        let datas = []
        if(props.search === ""){
            datas = markets            
        }else{
            datas = markets.filter((market) => re.test(market.market) || re.test(market.korean_name))
        }

        console.log(datas)
        return datas
    }, [props.search, markets])


    return (
        <ul className = "markets-table">
            {filter.map((market, index) => (
                <Market
                    key = {markets.market}
                    market = { market }
                    setMarket = { props.setMarket } 
                />
            ))}
        </ul>
    )
}
export default Markets;
