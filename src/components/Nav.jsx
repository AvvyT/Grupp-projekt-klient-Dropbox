import React from "react";
import { Link } from "react-router-dom";
import style from "./css/main.module.css";
const Nav = (props) => {
  return (
    <div className={style.ContainerDivStyle}>
      <h4 style={{ padding: 10, textAlign: "left", color: "#007EE5", flex: 1 }}>
        Files
      </h4>
      <ul className={style.listStyle}>
        <li className={style.listItemStyle}>
          <Link to="">Home</Link>
        </li>
        <li className={style.listItemStyle}>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>
    </div>
  );
};
export default Nav;
