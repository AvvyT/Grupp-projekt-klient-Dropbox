import React, { useState, useContext } from "react";
import styles from "./css/main.module.css";

import { DataContext } from "../store";
import { Dropbox } from "dropbox";

const Search = () => {
  const [searchWord, updateSearchWord] = useState("");
  const { dispatch } = useContext(DataContext);
  let dbx = new Dropbox({
    accessToken: window.localStorage.getItem("token"),
    clientId: "qwcieudyqiph2un",
    fetch
  });
  const searchFileOrFolder = () => {
    console.log(searchWord);

    // path in the user's Dropbox to search. Should probably be a folder

    let path = '';
    // query is For file name and folder searching 
    // starting index within the search results (used for paging)
    //	max_results => The maximum number of search results to return.
    dbx.filesSearch({
      path: path, query: searchWord, start: 0, max_results: 10, mode: { '.tag': 'filename_and_content' }
    })
      .then((res) => {
        const data = res.matches.map((a) => a.metadata);
        searchWord &&
          dispatch({
            type: "FETCH_DATA",
            data,
            searchActive: true
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    searchFileOrFolder();
    updateSearchWord("");
  };

  return (
    <form className={styles.fromStyle} onSubmit={handleSubmit}>
      <input placeholder="search" className={styles.inputStyle} value={searchWord}
        type='text'
        onChange={(e) => {
          updateSearchWord(e.target.value);
          // console.log(searchWord.length);
        }} />
      <button type="submit" className={styles.uploadButtonStyle}>
        <span>&#9906;</span>
      </button>
    </form>
  );
};

export default Search;
