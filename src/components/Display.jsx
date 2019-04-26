import React from "react";
import Nav from "./Nav";
import Main from "./Main";
import Upload from "./Upload";

const containerDivStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "20px"
};
const Display = (props) => {
  return (
    <div style={containerDivStyle}>
      <Nav />
      <Main />
      <Upload />
    </div>
  );
};
export default Display;
