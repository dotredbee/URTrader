import React, { useEffect, useRef, useState } from 'react';


function OrderBooks(props) {
    const _unmount = useRef(false)

    const [ asks, setAsks ] = useState([])
    const [ bids, setBids ] = useState([])
    async function load() { 
        const market = props.market.market || "KRW-BTC"
        
        const data = await window.ipcRenderer.invoke("orderbook", {
            market : market
        })

        if(_unmount.current) return 

        console.log(data.data)
        if(data.ok) { 
            setAsks(data.data.ask)
            setBids(data.data.bid)
        }
        
    }
    
    useEffect(() => {
        _unmount.current = false
        load()

        return () => _unmount.current = true
    }, [props.market])
    
    return (
        <div className='orderbook'>
            <table>
                <thead>
                    <tr>
                        <th>가격</th>
                        <th>사이즈</th>
                    </tr>
                </thead>
                <tbody>
                    {asks.map(ask => (
                        <tr>
                            <td>{ask.price.toLocaleString()}</td>
                            <td>{ask.size}</td>
                        </tr>
                    ))}
                    {bids.map(bid => (
                        <tr>
                            <td>{bid.price.toLocaleString()}</td>
                            <td>{bid.size}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default OrderBooks;
