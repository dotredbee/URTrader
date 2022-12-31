import React from 'react';
import { useAuth } from '../Context/AuthContext';
import ClipLoader from "react-spinners/ClipLoader"
function InfoBar(props) { 
    const auth = useAuth()
    return(
        <span className = "info-status-bar">
            <span className = "title">
                키 정보 :
            </span>
            <span className = "wrap">
            {auth.loading ?
                <span id = "loading" className = "text"><ClipLoader color = {"orange"} size = {12}/></span> :
                <>
                    {auth.status ?
                        <span className = "text">{auth.key} / 만료일 : {auth.expire}</span> :
                        <span className = "text">등록된 키가 없습니다.</span>   
                    }
                </>
            }
            </span>
            
        </span>
    )
}

export default InfoBar;
