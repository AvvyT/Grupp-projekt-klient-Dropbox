import React from "react";
import { dbx } from "./functions";
import styles from "./css/main.module.css";

const Upload = ({ location }) => {
  const handleAddFolder = () => {
    dbx
      .filesCreateFolderV2({ path: location.pathname, autorename: true })
      .then(function(response) {
        console.log(response);
      })
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
