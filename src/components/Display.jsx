import React, { useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import Nav from "./Nav";
import Main from "./Main";
import Upload from "./Upload";
import Favorites from "./Favorites";
import TopNav from "./TopNav";
import { Dropbox } from "dropbox";
import style from "./css/main.module.css";
/* eslint-disable no-use-before-define */
export let dbx = new Dropbox({
  accessToken: window.localStorage.getItem("token"),
  clientId: "qwcieudyqiph2un",
  fetch
});
const Display = (props) => {
  const token = window.localStorage.getItem("token");
  const connectButton = useRef();
  useEffect(() => {
    dbx = new Dropbox({
      accessToken: token,
      clientId: "qwcieudyqiph2un",
      fetch
    });
    const authUrl = dbx.getAuthenticationUrl("http://localhost:3000/callback/");
    if (!token) {
      connectButton.current.href = authUrl;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Nav {...props} />
            <div style={{ flex: 9, height: "100%" }}>
              <div className={style.DisplayDivStyle}>
                <TopNav {...props} />
                <div className={style.filesDiv}>
                  <Switch>
                    <Route path="/favorites" exact component={Favorites} />
                    <Route path="/" component={Main} />
                  </Switch>
                  <Upload {...props} />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Display;
