import React, { memo, useState } from "react";
import Auto from "./Order/Auto";
import Buy from "./Order/Buy";
import Menu from "./Order/Menu";
import Sell from "./Order/Sell";

function Order(props) {
    console.log("order rendering");
    const [status, setStatus] = useState("auto");

    return (
        <div className="order-contents">
            <Menu status={status} setStatus={setStatus} />
            {status === "auto" && <Auto market = {props.market}/>}
            {status === "buy" && <Buy />}
            {status === "sell" && <Sell />}
        </div>
    );
}

export default memo(Order);
