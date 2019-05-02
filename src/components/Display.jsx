import React, { useEffect, useRef, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Main from "./Main";
import Upload from "./Upload";
import Favorites from "./Favorites";
import TopNav from "./TopNav";
import { dbx } from "./functions";
import style from "./css/main.module.css";

/* eslint-disable no-use-before-define */

const Display = (props) => {
  const token = window.localStorage.getItem("token") || null;
  const connectButton = useRef();
  useEffect(() => {
    const authUrl = dbx.getAuthenticationUrl("http://localhost:3000/callback/");
    if (!token) connectButton.current.href = authUrl;
  }, [token]);
  return (
    <>
      <div className={style.mainDivStyle}>
        {!token ? (
          <>
            <h1>Dropbox</h1>
            <a href="/" ref={connectButton}>
              <button className={style.connectButtonStyle}>connect</button>
            </a>
          </>
        ) : (
          <>
            <TopNav {...props} />
            <div className={style.containerDivStyle}>
              <Nav {...props} />
              <Switch>
                <Route path="/favorites" exact component={Favorites} />
                <Route path="/" component={Main} />
              </Switch>
              <Upload {...props} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Display;
