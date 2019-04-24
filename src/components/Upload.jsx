import React from "react";
const ContainerDivStyle = {
  flex: 1,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "start"
};
const uploadButtonStyle = {
  padding: "15px 20px",
  borderRadius: "5px",
  fontWeight: "bolder",
  fontSize: "18px",
  background: "#007EE5",
  color: "white",
  border: "none"
};
const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  fontWeight: "bolder",
  fontSize: "13px",
  color: "#007EE5",
  border: "none",
  textAlign: "left",
  background: "none"
};
const Upload = (props) => {
  return (
    <div style={ContainerDivStyle}>
      <button style={uploadButtonStyle}>Upload Files</button>
      <button style={buttonStyle}>New shared folder</button>
      <button style={buttonStyle}>Upload Files</button>
      <button style={buttonStyle}>Upload Files</button>
    </div>
  );
};
export default Upload;
