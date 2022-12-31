import React, { memo } from "react";

function Trade(props) {
  return (
    <div className="trade-contents">
      <div className="title">자동거래 현황</div>
      <div className="wrap">
        <div className="market-contents frs-2">
          <span className="title">마켓 명</span>
          <span className="sub">
            <span className="big-up">비트코인</span>
            <span className="small-down">KRW-BTC</span>
          </span>
        </div>
        <div className="setup-contents">
          <div className="title">사용자 세팅 옵션</div>
          <div id="setup-init-price" className="item frs-2">
            <span className="title">시작 금액</span>
            <span className="sub">6,000</span>
          </div>
          <div id="setup-depth" className="item frs-2">
            <span className="title">DETPH</span>
            <span className="sub">9단계</span>
          </div>
        </div>
        <div className="current-contents">
          <div className="title">진행 상황</div>
          <div id="depth" className="item frs-2">
            <span className="title">DETPH</span>
            <span className="sub">9단계</span>
          </div>
          <div id="avg" className="item frs-2">
            <span className="title">평균단가</span>
            <span className="sub">6,000</span>
          </div>
          <div id="volume" className="item frs-2">
            <span className="title">보유 수량</span>
            <span className="sub">333.222115</span>
          </div>
        </div>
      </div>
      <div className="btn-wrap">
        <button id="stop">즉시 정지</button>
        <button id="pause">매도 후 정지</button>
      </div>
    </div>
  );
}

export default memo(Trade);
