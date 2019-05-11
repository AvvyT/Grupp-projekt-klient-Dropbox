import React, { useContext, useState } from "react";
import style from "./css/main.module.css";
import { Dropbox } from "dropbox";
import { FetchPath } from "./functions";
import { DataContext } from "../store";
import CreateFolder from "./Modals/CreateFolderModal";
import UploadProgress from "./UploadProgress";
const Upload = ({ location }) => {
  const { dispatch } = useContext(DataContext);
  const [idx, setIdx] = useState(0);
  const [items, setItems] = useState(0);
  const [info, setInfo] = useState({ name: "", size: "" });
  const [uploadedSize, setUploadedSize] = useState(0);
  const [uploadDisabled, setUploadDisabled] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
  const [on, setToggle] = useState(false);
  let dbx = new Dropbox({
    accessToken: window.localStorage.getItem("token"),
    clientId: "qwcieudyqiph2un",
    fetch
  });
  const uploadFile = (file) => {
    const UPLOAD_FILE_SIZE_LIMIT = 50 * 1024 * 1024;
    if (file && file.size < UPLOAD_FILE_SIZE_LIMIT) {
      dbx
        .filesUpload({
          path:
            (location.pathname === "/" ? "" : location.pathname) +
            "/" +
            file.name,
          contents: file
        })
        .then(() => {
          FetchPath(fetchData, location.pathname, dbx);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      const maxBlob = 8 * 1000 * 1000;
      let workItems = [];
      let offset = 0;
      setUploadDisabled(true);
      setInfo({ name: file.name, size: file.size });
      while (offset < file.size) {
        let chunkSize = Math.min(maxBlob, file.size - offset);
        workItems.push(file.slice(offset, offset + chunkSize));
        offset += chunkSize;
      }

      const task = workItems.reduce((acc, blob, idx, items) => {
        if (idx === 0) {
          return acc.then(() => {
            return dbx
              .filesUploadSessionStart({ close: false, contents: blob })
              .then((response) => {
                setIdx(idx);
                setItems(items.length);

                return response.session_id;
              });
          });
        } else if (idx < items.length - 1) {
          return acc.then((sessionId) => {
            var cursor = { session_id: sessionId, offset: idx * maxBlob };
            return dbx
              .filesUploadSessionAppendV2({
                cursor: cursor,
                close: false,
                contents: blob
              })
              .then(() => {
                setIdx(idx);
                setUploadedSize((idx * maxBlob * 0.000001).toFixed(0));
                return sessionId;
              });
          });
        } else {
          return acc.then(function(sessionId) {
            var cursor = {
              session_id: sessionId,
              offset: file.size - blob.size
            };
            var commit = {
              path: "/" + file.name,
              mode: "add",
              autorename: true,
              mute: false
            };
            return dbx
              .filesUploadSessionFinish({
                cursor: cursor,
                commit: commit,
                contents: blob
              })
              .then((res) => {
                FetchPath(fetchData, location.pathname, dbx);
                setUploadDone(true);
              });
          });
        }
      }, Promise.resolve());

      task.catch((error) => {
        console.error(error);
      });
    }
    return false;
  };

  const fetchData = (data) => {
    dispatch({
      type: "FETCH_DATA",
      data
    });
  };

  const handleCreateFolder = (name) => {
    dbx
      .filesCreateFolder({
        path: (location.pathname === "/" ? "" : location.pathname) + "/" + name,
        autorename: true
      })
      .then(function(response) {})
      .then(() => FetchPath(fetchData, location.pathname, dbx))
      .then(() => setToggle(!on))
      .catch(function(error) {
        console.error(error);
      });
  };

  return (
    <>
      <div className={style.ContainerDivStyle}>
        <label className={style.fileContainer}>
          <input
            type="file"
            onChange={(e) => uploadFile(e.target.files[0])}
            disabled={uploadDisabled}
          />
          <span> Upload Files</span>
        </label>
        <button onClick={() => setToggle(!on)} className={style.buttonStyle}>
          New folder
        </button>
      </div>
      {on && (
        <CreateFolder
          on={on}
          setToggle={setToggle}
          handleCreateFolder={handleCreateFolder}
        />
      )}
      {uploadDisabled && (
        <UploadProgress
          uploadDisabled={uploadDisabled}
          setUploadDisabled={setUploadDisabled}
          setUploadDone={setUploadDone}
          uploadDone={uploadDone}
          setInfo={setInfo}
          idx={idx}
          info={info}
          items={items}
          setIdx={setIdx}
          setItems={setItems}
          uploadedSize={uploadedSize}
        />
      )}
    </>
  );
};

export default Upload;
