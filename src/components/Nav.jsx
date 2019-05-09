import React from "react";
import { Link } from "react-router-dom";
import style from "./css/main.module.css";
const Nav = (props) => {
  return (
    <div className={style.ContainerNavStyle}>
      <ul className={style.listStyle}>
        <li>
          <Link to="/">
            <img
              className={style.logoImgStyle}
              alt="logo"
              src="https://cdn.freebiesupply.com/logos/large/2x/dropbox-2-logo-png-transparent.png"
            />
          </Link>
        </li>
        <li style={{ color: "#007EE5" }} className={style.listItemStyle}>
          Home
        </li>
        <li className={style.listItemStyle}>
          <Link to="">Files</Link>
        </li>
        <li className={style.listItemStyle}>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </div>
  );
};
export default Nav;
