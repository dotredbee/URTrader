import React, { memo } from "react";

function Account(props) {
  return (
    <div className="account-contents">
      <div className="title">보유KRW 정보</div>
      <div className="frs-2 account">
        <span className="title">사용 가능</span>
        <span className="sub">
          3,333,333.000<span className="small">KRW</span>
        </span>
      </div>
      <div className="frs-2 account">
        <span className="title">총 금액</span>
        <span className="sub">
          3,333,333.000<span className="small">KRW</span>
        </span>
      </div>
      <div className="frs-2 account">
        <span className="title">자동거래중</span>
        <span className="sub">
          3,333,333.000<span className="small">KRW</span>
        </span>
      </div>
    </div>
  );
}

export default memo(Account);
