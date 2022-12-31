import React from 'react';
import Keys from '../Components/KeyManager/Keys';

import WrongDocs from '../Components/KeyManager/WrongDocs';
function KeyManager(props) { 
    
    return (
        <div id = "key-manager" className = "container">
            <WrongDocs />
            <Keys />
        </div>
    )
}

export default KeyManager;
