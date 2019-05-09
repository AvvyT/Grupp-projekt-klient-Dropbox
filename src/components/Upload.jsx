import React, { useContext, useState } from "react";
import { dbx } from "./functions";
import styles from "./css/main.module.css";

//-- användare kan ladda upp alla-tiper av filer 
import { FetchPath } from "./functions";
import { DataContext } from "../store";
import CreateFolder from "./Modals/CreateFolderModal";

const Upload = ({ location }) => {
  const [file, setFile] = useState(null);
  const { dispatch } = useContext(DataContext);
  const [on, setToggle] = useState(false);

  const uploadFile = () => {
    console.log(file)
    const UPLOAD_FILE_SIZE_LIMIT = 150 * 1024 * 1024;

    if (file.size < UPLOAD_FILE_SIZE_LIMIT) { // File is smaller than 150 Mb - use filesUpload API
      dbx.filesUpload({ path: location.pathname.replace('/files', '') + '/' + file.name, contents: file })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error(error);
        });

    } else { // File is bigger than 150 Mb - use filesUploadSession* API
      const maxBlob = 8 * 1000 * 1000; // 8Mb - Dropbox JavaScript API suggested max file / chunk size
      let workItems = [];

      let offset = 0;
      while (offset < file.size) {
        let chunkSize = Math.min(maxBlob, file.size - offset);
        workItems.push(file.slice(offset, offset + chunkSize));
        offset += chunkSize;
      }

      const task = workItems.reduce((acc, blob, idx, items) => {
        if (idx === 0) {
          // Starting multipart upload of file
          return acc.then(() => {
            return dbx.filesUploadSessionStart({ close: false, contents: blob })
              .then(response => response.session_id)
          });
        } else if (idx < items.length - 1) {
          // Append part to the upload session
          return acc.then((sessionId) => {
            var cursor = { session_id: sessionId, offset: idx * maxBlob };
            return dbx.filesUploadSessionAppendV2({ cursor: cursor, close: false, contents: blob })
              .then(() => sessionId);
          });
        } else {
          // Last chunk of data, close session
          return acc.then(function (sessionId) {
            var cursor = { session_id: sessionId, offset: file.size - blob.size };
            var commit = { path: '/' + file.name, mode: 'add', autorename: true, mute: false };
            return dbx.filesUploadSessionFinish({ cursor: cursor, commit: commit, contents: blob });
          });
        }
      }, Promise.resolve());

      task.then((result) => {
        console.log(result)
      }).catch((error) => {
        console.error(error);
      });

    }
    return false;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    //dbx.filesUpload({ path: "/test/", contents: file }).then(res => console.log(res))
    uploadFile()
  }

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
      .then(function (response) {
        console.log(response);
      })
      .then(() => FetchPath(fetchData, location.pathname.replace("/files", "")))
      .then(() => setToggle(!on))
      .catch(function (error) {
        console.error(error);
      });
  };

  return (
    <>
      <div className={styles.ContainerDivStyle}>
        <form onSubmit={handleSubmit}>
          <input type="file"
            onChange={(e) => setFile(e.target.files[0])} />
          <button className={styles.uploadButtonStyle} type="submit">
            Upload Files
          </button>
        </form>
      </div>

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
