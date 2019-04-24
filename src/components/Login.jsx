import React from "react";
const formStyle = {
  height: "500px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
const Login = (props) => {
  return (
    <form style={formStyle}>
      <input placeholder="Login" />
      <button>Login</button>
    </form>
  );
};
export default Login;
