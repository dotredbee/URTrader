import React, { useState } from 'react';
import InputText from '../Components/Sign/InputText';
import { useAuth } from '../Context/AuthContext';

function Sign(props) { 
    const auth = useAuth()
    const [ secret, setSecret ] = useState("")
    const onClickSign = async (e) => { 
        e.preventDefault()
        
        const ret = await window.ipcRenderer.invoke("signin:key", {secret})
        
        if(ret.ok){
            auth.connect(ret.ok, ret.access, ret.expire)            
        }
    }
    return( 
        <div id = "sign" className = "container">
            <div className = "wrap">
                <div className = "title">
                    업비트 <span className = "strong">SECRET KEY</span>를 입력해 주세요.
                </div>
                <div className = "input-wrap">
                    <InputText setText = {setSecret}/>
                    <button 
                        id = "sign-submit" 
                        className = "btn"
                        disabled = {secret.length >= 32 ? false : true}
                        onClick = {onClickSign}
                    >인증하기</button>
                </div>
            </div>
        </div>
    )
}

export default Sign;
