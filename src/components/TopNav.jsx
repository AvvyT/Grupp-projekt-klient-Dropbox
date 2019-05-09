import React from "react";
import style from "./css/main.module.css";
import Search from "./Search";

const TopNav = ({ history, location, userInfo }) => {
  //console.log(userInfo);
  return (
    <div className={style.topNavStyle}>
      <div className={style.topNavRight}>
        <button onClick={() => history.goBack()}>
          <span>&#8592;</span>
        </button>
        <p>Home</p>
      </div>
      <div className={style.topNavLeft}>
        <Search />
        <button
          onClick={() => {
            window.localStorage.removeItem("token");
            history.push("/login");
          }}
          className={style.connectButtonStyle}
        >
          disconnect
        </button>
      </div>
    </div>
  );
};
export default TopNav;
