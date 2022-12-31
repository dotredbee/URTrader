import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faCommentDollar, faKey } from '@fortawesome/free-solid-svg-icons'
function Navigation(props) {
    const [ hash, setHash ] = useState("#/home")

    useEffect(() => {console.log(hash)}, [hash])
    const onClickLocate = (e) => {
        e.preventDefault()
        const { path } = e.target.dataset
        setHash(path)
        window.location.hash = path
    }
  return (
    <ul className="gnb">
      <li 
        id="home" 
        className={hash === "#/home" ? "item active" : "item"} 
        onClick = {onClickLocate}
        data-path = "#/home">
            <FontAwesomeIcon icon = {faHouse}/>
      </li>
      <li 
        id="trade" 
        className={hash === "#/trade" ? "item active" : "item"} 
        onClick = {onClickLocate}
        data-path = "#/trade">
            <FontAwesomeIcon icon={faCommentDollar} />
      </li>
      <li 
        id="upbit" 
        className={hash === "#/keymanager" ? "item active" : "item"} 
        onClick = {onClickLocate}
        data-path = "#/keymanager">
            <FontAwesomeIcon icon = {faKey} />
      </li>
    </ul>
  );
}

export default Navigation;
