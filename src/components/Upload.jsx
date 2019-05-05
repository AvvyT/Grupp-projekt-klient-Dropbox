import React, { useContext, useState } from "react";
import { dbx } from "./functions";
import styles from "./css/main.module.css";
import { FetchPath } from "./functions";
import { DataContext } from "../store";
import CreateFolder from "./Modals/CreateFolderModal";
const Upload = ({ location }) => {
  const { dispatch } = useContext(DataContext);
  const [on, setToggle] = useState(false);
  const fetchData = (data) => {
    dispatch({
      type: "FETCH_DATA",
      data
    });
  };

  const handleCreateFolder = (name) => {
    dbx
      .filesCreateFolder({
        path: location.pathname.replace("/files", "") + "/" + name,
        autorename: false
      })
      .then(function(response) {
        console.log(response);
      })
      .then(() => FetchPath(fetchData, location.pathname.replace("/files", "")))
      .then(() => setToggle(!on))
      .catch(function(error) {
        console.error(error);
      });
  };
  return (
    <>
      {on && (
        <CreateFolder
          on={on}
          setToggle={setToggle}
          handleCreateFolder={handleCreateFolder}
        />
      )}
      <div className={styles.ContainerDivStyle}>
        <button className={styles.uploadButtonStyle}>Upload Files</button>
        <button onClick={() => setToggle(!on)} className={styles.buttonStyle}>
          New folder
        </button>
      </div>
    </>
  );
};
export default Upload;
