import React from "react";
import { Redirect } from "react-router-dom";
import style from "./css/main.module.css";
const Callback = () => {
  window.localStorage.setItem(
    "token",
    window.location.hash.match(/#(?:access_token)=([\S\s]*?)&/)[1]
  );
  return (
    <div className={style.mainDivStyle}>
      {!window.location.hash.match(/#(?:access_token)=([\S\s]*?)&/)[1] ? (
        <div className="spiner" />
      ) : (
        <Redirect to="/files" />
      )}
    </div>
  );
};
export default Callback;
