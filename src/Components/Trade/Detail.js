import React, { memo, useEffect, useRef, useState } from 'react';
import MiddleBar from './Detail/MiddleBar';

function Detail(props) { 
    const _unmount = useRef(false)
    const _interval = useRef()
    const [ detail, setDetail ] = useState(null)
    const load = async () => {
        const market = props.market.market || "KRW-BTC"
        const { ok, detail } = await window.ipcRenderer.invoke("market:detail", market)

        if(_unmount.current) return 
        console.log(detail)
        if(ok){
            setDetail(detail[0])
        }else{
            setDetail(null)
        }
    }
    useEffect(() => {
        _unmount.current = false
        load()

        function intervalRefrash(){
            return setInterval(() => load(), 350)
        }
        
        _interval.current = intervalRefrash()
        return function cleanUp(){
            _unmount.current = true
            clearInterval(_interval.current)
            _interval.current = null
        }
    }, [props.market])
    return(
        <>
            {detail !== null &&
                <>
                    <div className = "header">
                        <div className = "title">
                            <span className = "korean_market">{props.market.korean_name !== undefined ? props.market.korean_name : "비트코인"}</span>
                            <span className = "market">{props.market.market !== undefined ? props.market.market : "KRW-BTC"}</span>
                        </div>
                        
                        {detail !== null && <MiddleBar 
                            change = {detail.change}
                            trade_price = {detail.trade_price}
                            signed_change_rate = {detail.signed_change_rate}
                            change_price = {detail.change_price}
                        />}
                    </div>
                    <div className = "middle">
                        <div className = "gap-wrap">
                            <div className = "high">
                                <span className = "title">고가</span>
                                <span className = "price">{detail.high_price.toLocaleString()}</span>
                            </div>
                            <div className = "row">
                                <span className = "title">저가</span>
                                <span className = "price">{detail.low_price.toLocaleString()}</span>
                            </div>
                        </div>
                        <div className = "hour-info-wrap">
                            <div className = "trade-volume">
                                <span className = "title">거래량(24H)</span>
                                <span className = "info">
                                    <span className = "volume">{detail.acc_trade_volume_24h.toLocaleString()}</span>
                                    <span className = "unit">
                                        {props.market.market !== undefined ? props.market.market.split("-")[1] : "BTC"}
                                    </span>
                                </span>
                            </div>
                            <div className = "trade-price">
                                <span className = "title">거래대금(24H)</span>
                                <span className = "price">
                                    <span className = "title">{detail.acc_trade_price_24h.toLocaleString()}</span>
                                    <span className = "unit">KRW</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default memo(Detail);
