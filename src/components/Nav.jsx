import React from "react";
const ContainerDivStyle = {
  flex: 1,
  height: "100%",
  marginRight: "10px",
  display: "flex",
  flexDirection: "column"
};
const listStyle = {
  flex: 9,
  listStyle: "none"
};
const listItemStyle = {
  padding: "10px"
};
const Nav = (props) => {
  return (
    <div style={ContainerDivStyle}>
      <h4 style={{ padding: 10, textAlign: "left", color: "#007EE5", flex: 1 }}>
        Files
      </h4>
      <ul style={listStyle}>
        <li style={listItemStyle} className="active">
          My Files
        </li>
        <li style={listItemStyle}> Sharing</li>
        <li style={listItemStyle}>File request</li>
        <li style={listItemStyle}>Deleted Files</li>
      </ul>
    </div>
  );
};
export default Nav;
