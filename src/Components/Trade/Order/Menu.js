import React from "react";

function Menu(props) {
  console.log(" memu rendering");
  const handlerOnClickMenuItem = (e) => {
    e.preventDefault();
    const { item } = e.target.dataset;

    props.setStatus(item);
  };
  return (
    <ul className="order-menu">
      <li
        className={props.status === "auto" ? "item active" : "item"}
        data-item="auto"
        onClick={handlerOnClickMenuItem}
      >
        <span>자동</span>
      </li>
      <li
        className={props.status === "buy" ? "item active" : "item"}
        data-item="buy"
        onClick={handlerOnClickMenuItem}
      >
        <span>매수</span>
      </li>
      <li
        className={props.status === "sell" ? "item active" : "item"}
        data-item="sell"
        onClick={handlerOnClickMenuItem}
      >
        <span>매도</span>
      </li>
    </ul>
  );
}

export default Menu;
