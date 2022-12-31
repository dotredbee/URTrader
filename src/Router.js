import React, { useEffect } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import HashLoading from "./Components/HashLoading";

import Navigation from "./Components/Navigation";
import StatusBar from "./Components/StatusBar";
import TopBar from "./Components/TopBar";
import TradeStatusBar from "./Components/TradeStatusBar";
import { useAuth } from "./Context/AuthContext";
import Home from "./Routes/Home";
import KeyManager from "./Routes/KeyManager";
import Sign from "./Routes/Sign";
import Trade from "./Routes/Trade";


function PublicRouter(props) { 
    return (
        <Routes>
            <Route path= "/*" element = {<Sign />} /> 
        </Routes>
    )
}

function PrivateRouter(props) { 
    return (
        <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/trade" element={<Trade />} />
            <Route path="/keymanager" element = {<KeyManager />}/>
        </Routes>
    )
}

function Routers(props){
    const auth = useAuth()
    return (
        <>
            {auth.status ?
                <PrivateRouter /> :
                <PublicRouter />
            }
        </>
    )
}
function Router(props) {
    const auth = useAuth()
    
    useEffect(() => { 
        console.log('loading...')
        auth.is()
    }, [])
    return (
        <HashRouter>
            <Navigation />
            <div className = "main-container">
                <TopBar />
                <>
                    {auth.loading ? 
                    <HashLoading /> :
                    <Routers />
                    }
                </>
            </div>
        </HashRouter>
  );
}


export default Router;
