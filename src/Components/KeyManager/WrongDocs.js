import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
function WrongDocs(props) { 
    return (
        <div className = "wrong-docs">
            <div className = "title">
                <span className = "simbol"><FontAwesomeIcon icon = {faTriangleExclamation}/></span>
                <span className = "text">주의사항</span>
            </div> 
            <div className = "wrap">
                <p>
                    자동매매가 진행중일때는 키 변경작업은 자동매매 동작에 문제를 발생시킬수 있습니다.
                </p>
                <p>
                    키 변경은 자제해 주세요.
                </p>
            </div>
        </div>
    )
}

export default WrongDocs;
