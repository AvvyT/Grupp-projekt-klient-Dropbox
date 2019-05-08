import React, { useState, useContext } from "react";
import { dbx } from "./functions";
import styles from "./css/main.module.css";
import { DataContext } from "../store";

// Visa sökresultat istället för huvudinnehållet
// Om en användare klickar på en katalog ska applikationen navigera till den katalogen
// Om en användare klickar på en fil ska filen laddas ner

const Search = () => {
  const [searchWord, updateSearchWord] = useState("");
  const { dispatch } = useContext(DataContext);

  const searchFileOrFolder = () => {
    let path = "";
    dbx
      .filesSearch({
        path: path,
        query: searchWord,
        start: 0,
        max_results: 10,
        mode: { ".tag": "filename_and_content" }
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
      <input
        placeholder="search"
        className={styles.inputStyle}
        value={searchWord}
        onChange={(e) => {
          updateSearchWord(e.target.value);
        }}
      />
      <button type="submit" className={styles.uploadButtonStyle}>
        <span>&#9906;</span>
      </button>
    </form>
  );
};

export default Search;
