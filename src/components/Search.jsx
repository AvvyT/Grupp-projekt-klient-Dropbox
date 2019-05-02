import React from "react";
import style from "./css/main.module.css";
const Search = (props) => {
  return (
    <form className={style.fromStyle}>
      <input placeholder="search" className={style.inputStyle} />
    </form>
  );
};
export default Search;
