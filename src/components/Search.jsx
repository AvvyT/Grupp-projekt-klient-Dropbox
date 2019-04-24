import React from "react";
const fromStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "start",
  alignItems: "center"
};
const inputStyle = {
  padding: "10px 10px",
  borderRadius: "25px",
  border: "1px solid lightGray",
  width: "100%"
};
const Search = (props) => {
  return (
    <form style={fromStyle}>
      <input placeholder="search" style={inputStyle} />
    </form>
  );
};
export default Search;
