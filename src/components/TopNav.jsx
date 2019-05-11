import React, { useState, useRef, useEffect } from "react";
import style from "./css/main.module.css";
import Search from "./Search";
import { Dropbox } from "dropbox";

const TopNav = ({ history, location }) => {
  //console.log(userInfo);
  const [userInfo, setUserInfo] = useState("");
  const { name } = userInfo;
  const [toggleDropDown, setDropDown] = useState(false);
  const [storageInfo, setStorageInfo] = useState(0);
  const dropDownList = useRef();
  OnClickOutside(dropDownList, setDropDown);
  useEffect(() => {
    let dbx = new Dropbox({
      accessToken: window.localStorage.getItem("token"),
      clientId: "qwcieudyqiph2un",
      fetch
    });
    dbx
      .usersGetAccount({ account_id: localStorage.getItem("account_id") })
      .then((res) => setUserInfo(res));

    dbx.usersGetSpaceUsage().then((res) => {
      //1,074×10^+9
      setStorageInfo({
        all: res.allocation.allocated,
        used: res.used
      });
      console.log((res.used / res.allocation.allocated) * 100);
    });
  }, []);

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
        <div className={style.UserDropDown}>
          <div
            className={style.UserDropDownIcon}
            onClick={() => setDropDown(!toggleDropDown)}
          >
            <img
              src="https://cfl.dropboxstatic.com/static/images/avatar/faceholder-vflGRnT85.svg"
              alt="toggleDropList"
            />
          </div>
          {toggleDropDown && (
            <div className={style.UserDropDownDropList} ref={dropDownList}>
              <ul>
                <li>
                  <div className={style.dropDownListOne}>
                    <div className={style.dropDownUserLogo}>
                      <img
                        src="https://cfl.dropboxstatic.com/static/images/avatar/faceholder-vflGRnT85.svg"
                        alt=""
                      />
                    </div>
                    <div className={style.dropDownUserInfo}>
                      <span>{userInfo && name.display_name}</span>
                      <span>{userInfo.email}</span>
                    </div>
                  </div>
                  <div className={style.dropDownProgress}>
                    <div
                      className={style.dropDownProgressBar}
                      style={{
                        width: (storageInfo.used / storageInfo.all) * 100 + "%"
                      }}
                    />
                  </div>
                </li>
                <li className={style.dropDownListTow}>
                  <span>
                    {(storageInfo.used / 1000000).toFixed(2)} MB of{" "}
                    {storageInfo.all / 1073741824}GB used
                  </span>
                  {storageInfo.all / 1073741824 <= 2 ? (
                    <span>Upgrade</span>
                  ) : null}
                </li>
                <li
                  onClick={() => {
                    window.localStorage.removeItem("token");
                    history.push("/login");
                  }}
                  className={style.dropDownListThree}
                >
                  sign out
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  function OnClickOutside(ref, handler) {
    useEffect(() => {
      const listener = (event) => {
        if (
          !ref.current ||
          ref.current.contains(event.target) ||
          event.target.alt === "toggleDropList"
        )
          return;
        handler();
      };
      document.addEventListener("mousedown", listener);
      document.addEventListener("touchstart", listener);
      return () => {
        document.removeEventListener("mousedown", listener);
        document.removeEventListener("touchstart", listener);
      };
    }, [handler, ref]);
  }
};
export default TopNav;
