import React, { memo } from 'react';
import InfoBar from './InfoBar';
import StatusBar from './StatusBar';
import TradeStatusBar from './TradeStatusBar';


function TopBar(props) { 
    return(
        <div className = "top-bar">
            <div className = "left">
                <StatusBar />
                <InfoBar />
            </div>
            <div className = "right">
                <TradeStatusBar />
            </div>
        </div>
    )
}

export default memo(TopBar);

