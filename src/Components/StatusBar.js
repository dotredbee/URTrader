import React, { memo } from "react";
import { useAuth } from "../Context/AuthContext";
import ClipLoader from "react-spinners/ClipLoader"
function StatusBar(props) {
    const auth = useAuth()
    return (
        <span className="status-bar">
            <span className="title">업비트 연동 :</span>
            <span className="wrap">
            
                {auth.loading ? 
                    <span id = "loading" className = "text"><ClipLoader color = {"orange"} size = {12}/></span> :
                    <span className= {auth.status ? "text signin" : "text signout"}
                    >{auth.status ? "연동" : "미연동"}</span>
                }
            </span>
        </span>
    );
}

export default memo(StatusBar);
