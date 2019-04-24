import React from "react";
import Test from "./components/Test";
const mainDivStyle = {
  flex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column"
};
const App = (props) => {
  console.log(props.name);
  return (
    <>
      <div style={mainDivStyle}>
        <h1>user : {props.name}</h1>
        <Test />
      </div>
    </>
  );
};
export default App;
