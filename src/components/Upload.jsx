import React, { useContext } from "react";
import { dbx } from "./functions";
import styles from "./css/main.module.css";
import { FetchPath } from "./functions";
import { DataContext } from "../store";

const Upload = ({ location }) => {
  const { state, dispatch } = useContext(DataContext);
  const { files } = state;
  const fetchData = (data) => {
    dispatch({
      type: "FETCH_DATA",
      data
    });
  };
  const handleAddFolder = () => {
    dbx
      .filesCreateFolder({
        path: location.pathname.replace("/files", ""),
        autorename: true
      })
      .then(function(response) {
        console.log(response);
      })
      .then(() => FetchPath(fetchData, location.pathname.replace("/files", "")))
      .catch(function(error) {
        console.error(error);
      });
  };
  return (
    <div className={styles.ContainerDivStyle}>
      <button className={styles.uploadButtonStyle}>Upload Files</button>
      <button onClick={handleAddFolder} className={styles.buttonStyle}>
        Create folder
      </button>
    </div>
  );
};
export default Upload;
