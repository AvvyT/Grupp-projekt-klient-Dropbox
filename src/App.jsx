import React from "react";
import Container from "./components/Container";
import { Route } from "react-router-dom";
const mainDivStyle = {
  flex: 1,
  width: "100%",
  display: "flex",
  flexDirection: "column"
};
const App = (props) => {
  return (
    <>
      <div style={mainDivStyle}>
        {/*<Route path="/login" exact component={Login} />*/}
        <Route path="" exact component={Container} />
      </div>
    </>
  );
};
export default App;
