import React from "react";
import { Redirect } from "react-router-dom";
import style from "./css/main.module.css";
import { parseQueryString } from "mithril";
const Callback = () => {
  console.log();
  window.localStorage.setItem(
    "token",
    parseQueryString(window.location.hash.substr(1)).access_token
  );
  window.localStorage.setItem(
    "account_id",
    parseQueryString(window.location.hash.substr(1)).account_id
  );
  console.log(parseQueryString(window.location.hash.substr(1)).account_id);
  return (
    <div className={style.mainDivStyle}>
      {!parseQueryString(window.location.hash.substr(1)).access_token ? null : (
        <Redirect to="/" />
      )}
    </div>
  );
};
export default Callback;
