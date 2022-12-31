import React from "react";
import Account from "../Components/Home/Account";
import Trade from "../Components/Home/Trade";
function Home(props) {
  return (
    <div id="home" className="container">
      <Account />
      <Trade />
    </div>
  );
}

export default Home;
