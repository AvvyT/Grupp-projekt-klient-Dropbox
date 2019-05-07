import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";
import style from "./css/main.module.css";
const TopNav = ({ history, location }) => {
  return (
    <div className={style.topNavStyle}>
      <div className={style.logoDivStyle}>
        <Link to="/files">
          <img
            className={style.logoImgStyle}
            alt="logo"
            src="https://cdn.freebiesupply.com/logos/large/2x/dropbox-2-logo-png-transparent.png"
          />
        </Link>
      </div>
      <h1 className={style.titleStyle}>Dropbox</h1>
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
  );
};
export default TopNav;
