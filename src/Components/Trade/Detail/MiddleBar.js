import React, { memo, useMemo, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown, faMinus } from '@fortawesome/free-solid-svg-icons'
function MiddleBar(props) { 
    const _unmount = useRef(false)

    const color = useMemo(() => {
        if(!_unmount.current){
            if(props.change === "RISE") return {color : "red"}
            else if(props.change === "FALL") return {color : "blue"}
            else return {color : "white"}
        }
    }, [props.change])

    const caret = useMemo(() => {
        if(!_unmount.current){
            if(props.change === "RISE") return faCaretUp
            else if(props.change === "FALL") return faCaretDown
            else return faMinus
        }
    }, [props.change])
    return(
        <div className = "price-tab-bar">
            <span className = "current-price-wrap" style = {color}>
                <span className = "price">{props.trade_price.toLocaleString()}</span>
                <span className = "unit">KRW</span>
            </span>
            <span className = "compare-before-wrap">
                <span className = "compare-before-percent-wrap">
                    <span className = "title">전일 대비</span>
                    <span id = "price-percent" style = {color}>{(props.signed_change_rate * 100).toFixed(2)}%</span>
                </span>
                <span className = "compare-before-price-wrap">
                    <span className = "icon" style = {color}>
                        <FontAwesomeIcon icon = {caret} />
                    </span>
                    <span id = "price" style = {color}>{props.change_price.toLocaleString()}</span>
                </span>
            </span>
        </div>
    )
}

export default memo(MiddleBar);
