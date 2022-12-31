import React, { memo, useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import HashLoading from '../HashLoading';


function Key(props) {
    const [toggle, setToggle ] = useState(false)

    const handlerOnMouseEnter = () => setToggle(true)
    
    const handlerOnMouseLeave = () => setToggle(false)
    
    const handleOnClick = () => {
        console.log('click')
    }
    return (
        <li className = "key" onMouseEnter={handlerOnMouseEnter} onMouseLeave = {handlerOnMouseLeave}>
            {props.data.access_key === props.current &&
             <div className = "cover">
                 <span>CURRENT KEY</span>
             </div>
            }
            <div 
                id = "change"
                className = {toggle === true && props.data.access_key !== props.current ? "active-cover active" : "active-cover"}
                onClick = {handleOnClick}
            >
                <span>CHANGE KEY</span>
            </div>
            <div 
                className = "text">
                 <div id = "access"><span className = "title">ACCESS KEY</span> {props.data.access_key}</div>
                 <div id = "expire">만료일 {props.data.expire_at}</div>
            </div>
        </li>
    )
}


function KeyTable(props) { 
    
    return (
        <>
            {props.keys.length === 0 ?
                <span>
                    <span className = "simbol"><FontAwesomeIcon icon = {faKey} /></span>
                    <span className = "title">Not Found</span>
                </span> :
                <div>
                    <ul className = "keys-tb">
                       {props.keys.map((key, index) => (
                           <Key key = {index} data = {key} current = {props.current} />
                       ))

                       } 
                    </ul>
                </div>
            }
        </>
    )
}
function Keys(props) {
    const _unmount = useRef(false)
    const [ keys, setKeys ] = useState([])
    const [ loading, setLoading ] = useState(false)
    const [ current, setCurrent ] = useState("")
    const onClickLoad = async (e) => {
        e.preventDefault()
        setLoading(true)
        const data = await window.ipcRenderer.invoke("keys", null) 
        if(data.ok){
            // 성공적으로 받아옴
            if(_unmount.current) return 
            setKeys(data.data)
            setCurrent(data.current)
        }
        setTimeout(() => {
            if(_unmount.current) return
            setLoading(false)
        }, 1500)
    }

    useEffect(() => {
        _unmount.current = false 
        return () => _unmount.current = true
    }, [])
    return(
        <div className = "keys">
            <div className = "top">
                <span className = "title">
                    <span className = "simbol">
                        <FontAwesomeIcon icon = {faKey} />
                    </span>
                    <span className = "text">키 관리자</span>
                </span>
                <button id = "load" onClick = {onClickLoad}>불러오기</button>
            </div>
            <div className = "bottom">
                <div id = {keys.length === 0 ? "is-not-key" : "is-key"} className = "key-table">
                    {loading ? 
                        <HashLoading /> :
                        <KeyTable keys = {keys} current = { current }/>
                    }
                </div>
            </div>
        </div>
    )
}

export default memo(Keys);
