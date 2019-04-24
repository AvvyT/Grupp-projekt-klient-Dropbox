import React from "react";
import Search from "./Search";
const containerSDivStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "0 20px"
};
const titleStyle = {
  flex: 6,
  marginRight: "10px",
  color: "#007EE5"
};
const logoDivStyle = {
  flex: 1,
  height: "50px",
  marginRight: "10px",
  border: "1px solid white",
  padding: "3px",
  display: "flex",
  justifyContent: "start",
  alignItems: "center"
};
const logoImgStyle = {
  height: "40px"
};
const TopNav = (props) => {
  return (
    <div style={containerSDivStyle}>
      <div style={logoDivStyle}>
        <img
          style={logoImgStyle}
          alt="logo"
          src="https://cdn.freebiesupply.com/logos/large/2x/dropbox-2-logo-png-transparent.png"
        />
      </div>
      <h1 style={titleStyle}>Dropbox</h1>
      <Search />
    </div>
  );
};
export default TopNav;
