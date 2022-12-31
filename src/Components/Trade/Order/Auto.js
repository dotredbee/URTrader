import React, { memo } from "react";

function Auto(props) {
    console.log(props.market)
  return (
    <div id="auto" className="trade-setup-contents">
      <div id="market" className="input-item frs-2">
        <label htmlFor="market">종목</label>
        <input type="text" readOnly value = {props.market.market || "KRW-BTC"}/>
      </div>
      <div id="init-price" className="input-item frs-2">
        <label htmlFor="initPrice">
          매수 시작가<span className="small-down">(시장가 매수)</span>
        </label>
        <input type="text" />
      </div>
      <div id="depth" className="input-item frs-2">
        <label htmlFor="depth">DEPTH</label>
        <input type="number" readOnly />
      </div>
      <div id="total-price" className="input-item frs-2">
        <label htmlFor="total">
          매수 비용<span className="small-down">(총합)</span>
        </label>
        <input type="text" readOnly />
      </div>
      <div id="need-price" className="input-item frs-2">
        <label htmlFor="need">
          필요한 비용<span className="small-down">(수수료 계산)</span>
        </label>
        <input type="text" readOnly />
      </div>
      <div className="btn-wrap">
        <button id="start">자동 매매</button>
      </div>
    </div>
  );
}

export default memo(Auto);
