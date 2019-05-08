import React, { useState, useContext } from "react";
import { dbx } from "./functions";
import style from "./css/main.module.css";
import DeleteModal from "./Modals/DeleteModal";
import MoveModal from "./Modals/MoveModal";
import File from "./File";
import { DataContext } from "../store";
import { Route, Redirect } from "react-router-dom";
import CopyModal from "./Modals/CopyModal";
const FilesTable = ({
  files,
  storage,
  setStorage,
  location,
  children,
  FetchPath,
  favorites,
  history
}) => {
  const [deleteOn, setDeleteToggle] = useState(false);
  const [CopyOn, setCopyToggle] = useState(false);
  const [moveOn, setMoveToggle] = useState(false);
  const [modalData, setModalDate] = useState("");
  const { dispatch } = useContext(DataContext);

  const handleFavorite = (file) => {
    if (storage.findIndex((x) => x.id === file.id) === -1) {
      let newStorage = [...storage, file];
      setStorage(newStorage);
    } else {
      let newStorage = storage.filter((index) => index.id !== file.id);
      setStorage(newStorage);
    }
  };
  const downloadFile = (id, name, type) => {
    if (type === "file") {
      dbx
        .filesDownload({ path: id })
        .then(function(response) {
          var URL = window.URL.createObjectURL(response.fileBlob);
          const tempLink = document.createElement("a");
          tempLink.href = URL;
          tempLink.setAttribute("download", name);
          tempLink.click();
        })
        .catch(function(error) {
          console.error(error);
        });
    } else {
      dbx
        .filesDownloadZip({ path: id })
        .then(function(response) {
          var URL = window.URL.createObjectURL(response.fileBlob);
          const tempLink = document.createElement("a");
          tempLink.href = URL;
          tempLink.setAttribute("download", name);
          tempLink.click();
        })
        .catch(function(error) {
          console.error(error);
        });
    }
    return false;
  };
  const handleDelete = () => {
    dbx
      .filesDelete({ path: modalData.id })
      .then((res) => {
        dispatch({ type: "DELETE_FILE", file: res });
      })
      .then(() => {
        if (storage.findIndex((x) => x.id === modalData.file.id) === -1) {
          let newStorage = storage.filter(
            (index) => index.id !== modalData.file.id
          );
          setStorage(newStorage);
        }
      })
      .then(() => setDeleteToggle(!deleteOn))
      .then(() => setModalDate(""))
      .catch(function(error) {
        console.error(error);
      });
  };
  const handleMove = () => {
    dbx
      .filesMove({
        from_path: modalData.from_path,
        to_path: location.pathname.replace("/move", "") + "/" + modalData.name,
        allow_shared_folder: false,
        autorename: true,
        allow_ownership_transfer: false
      })
      .then(() => {
        setModalDate("");
        setMoveToggle(!moveOn);
      })
      .catch(function(error) {
        console.error(error);
      });
  };
  const handleCopy = (name) => {
    const extension =
      modalData.name.indexOf(".") > -1
        ? "." + modalData.name.replace(/^.*\./, "")
        : "";
    dbx
      .filesCopy({
        from_path: modalData.from_path,
        to_path:
          location.pathname.replace("/copy", "") +
          "/" +
          (name ? name + extension : modalData.name),
        allow_shared_folder: false,
        autorename: true,
        allow_ownership_transfer: false
      })
      .then(() => {
        setModalDate("");
        setCopyToggle(!CopyOn);
      })
      .catch(function(error) {
        console.error(error);
      });
  };
  const handleRename = (name) => {
    const extension =
      modalData.name.indexOf(".") > -1
        ? "." + modalData.name.replace(/^.*\./, "")
        : "";
    dbx
      .filesMove({
        from_path: modalData.from_path,
        to_path:
          location.pathname === "/"
            ? location.pathname + name + extension
            : location.pathname + "/" + name + extension,
        allow_shared_folder: false,
        autorename: true,
        allow_ownership_transfer: false
      })
      .then((res) => {
        dispatch({ type: "CHANGE_NAME", file: res, id: res.id });
        if (storage.findIndex((x) => x.id === res.id) !== -1) {
          const file = storage[storage.findIndex((x) => x.id === res.id)];
          file.name = res.name;
          file.path_display = res.path_display;
          file.path_lower = res.path_lower;
          file.server_modified = res.server_modified;
          const newStorage = [...storage];
          setStorage(newStorage);
        }
      })
      .catch(function(error) {
        console.error(error);
      });
  };
  return (
    <>
      {deleteOn && (
        <DeleteModal
          name={modalData.name}
          deleteOn={deleteOn}
          setDeleteToggle={setDeleteToggle}
          handleDelete={handleDelete}
        />
      )}
      {moveOn ? (
        <Route
          path="/"
          render={(props) => (
            <MoveModal
              name={modalData.name}
              moveOn={moveOn}
              setMoveToggle={setMoveToggle}
              handleMove={handleMove}
              action="move"
              {...props}
            />
          )}
        />
      ) : location.pathname.includes("/move") ? (
        <Redirect to={location.state.currentLocation} />
      ) : null}
      {CopyOn ? (
        <Route
          path="/"
          render={(props) => (
            <CopyModal
              name={modalData.name}
              CopyOn={CopyOn}
              setCopyToggle={setCopyToggle}
              handleCopy={handleCopy}
              action="copy"
              {...props}
            />
          )}
        />
      ) : location.pathname.includes("/copy") ? (
        <Redirect to={location.state.currentLocation} />
      ) : null}
      <div className={style.mainTableDisplayStyle}>
        <div className={style.mainTableDisplayStyle}>
          {files && files.length > 0 ? (
            <table className={style.tableStyle}>
              <thead>
                <tr>
                  <th>
                    <p>Name</p>
                  </th>
                  <th>Modified</th>
                  <th>Size</th>
                  <th>
                    <svg
                      focusable="false"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      role="img"
                    >
                      <g fill="#637282" fillRule="evenodd">
                        <path d="M6 15h2v2H6zM10 15h8v2h-8zM6 11h2v2H6zM10 11h8v2h-8zM6 7h2v2H6zM10 7h8v2h-8z" />
                      </g>
                    </svg>
                  </th>
                </tr>
              </thead>
              <tbody>
                {files
                  .sort((a, b) => {
                    if (
                      (a[".tag"] === "folder" || b[".tag"] === "folder") &&
                      !(a[".tag"] === b[".tag"])
                    ) {
                      return a[".tag"] === "folder" ? -1 : 1;
                    } else {
                      return a.name.toLowerCase() < b.name.toLowerCase()
                        ? -1
                        : 1;
                    }
                  })
                  .map((file) => (
                    <File
                      key={file.id}
                      file={file}
                      handleFavorite={handleFavorite}
                      handleRename={handleRename}
                      storage={storage}
                      favorites={favorites}
                      downloadFile={downloadFile}
                      setModalDate={setModalDate}
                      setMoveToggle={setMoveToggle}
                      setDeleteToggle={setDeleteToggle}
                      setCopyToggle={setCopyToggle}
                      CopyOn={CopyOn}
                      moveOn={moveOn}
                      deleteOn={deleteOn}
                      location={location}
                    />
                  ))}
              </tbody>
            </table>
          ) : (
            children
          )}
        </div>
      </div>
    </>
  );
};
export default FilesTable;
