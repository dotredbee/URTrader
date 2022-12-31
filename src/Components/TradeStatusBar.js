import React, { memo } from "react";

function TradeStatusBar(props) {
  return (
    <span className="trade-status-bar">
      <span className="title">자동거래 :</span>
      <span className="wrap">
        <span className="text">정지중</span>
      </span>
    </span>
  );
}

export default memo(TradeStatusBar);
