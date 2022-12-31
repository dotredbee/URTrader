import React from 'react';
import HashLoader from "react-spinners/HashLoader"

function HashLoading(props) {
    return (
        <div id = "loading" className = "container">
            <HashLoader color = {"orange"}size = {124}/>
        </div>
    )
}

export default HashLoading;
