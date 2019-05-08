import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { dbx } from "./functions";
import style from "./css/main.module.css";
import DeleteModal from "./Modals/DeleteModal";
import MoveModal from "./Modals/MoveModal";
import Options from "./Options";
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
      .then(() => setModalDate(""));
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
                  .map((file) => {
                    let thumbnail;
                    if (file[".tag"] === "file") {
                      thumbnail = file.thumbnail
                        ? `data:image/jpeg;base64, ${file.thumbnail.thumbnail}`
                        : `data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg version='1.1' id='Capa_1' x='0px' y='0px' viewBox='0 0 60 60' style='enable-background:new 0 0 60 60;' xmlns='http://www.w3.org/2000/svg'%3E%3Cg%3E%3Cpath d='M42.5,22h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,22,42.5,22z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M17.5,16h10c0.552,0,1-0.447,1-1s-0.448-1-1-1h-10c-0.552,0-1,0.447-1,1S16.948,16,17.5,16z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,30h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,30,42.5,30z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,38h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,38,42.5,38z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M42.5,46h-25c-0.552,0-1,0.447-1,1s0.448,1,1,1h25c0.552,0,1-0.447,1-1S43.052,46,42.5,46z' style='fill: rgb(0, 126, 229);'/%3E%3Cpath d='M38.914,0H6.5v60h47V14.586L38.914,0z M39.5,3.414L50.086,14H39.5V3.414z M8.5,58V2h29v14h14v42H8.5z' style='fill: rgb(0, 126, 229);'/%3E%3C/g%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3Cg/%3E%3C/svg%3E`;
                    } else {
                      thumbnail = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' focusable='false' width='40' height='40' viewBox='0 0 40 40' class='mc-icon mc-icon-template-content mc-icon-template-content--folder-small brws-file-name-cell-icon' role='img'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2371B9F4'%3E%3C/path%3E%3Cpath d='M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2392CEFF'%3E%3C/path%3E%3C/g%3E%3C/svg%3E`;
                    }
                    return (
                      <tr key={file.id}>
                        <td>
                          <img
                            className={style.iconImgStyle}
                            alt="icon"
                            src={thumbnail}
                          />
                          {file[".tag"] === "folder" ? (
                            <Link to={file.path_lower}>{file.name}</Link>
                          ) : (
                            <>
                              {file.name}
                              <button
                                onClick={() => handleFavorite(file)}
                                className={style.favoriteButton}
                              >
                                {storage &&
                                storage.findIndex((x) => x.id === file.id) !==
                                  -1 ? (
                                  <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    className={style.favoriteIconOn}
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558L16 20.949z"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width="32"
                                    height="32"
                                    viewBox="0 0 32 32"
                                    className={style.favoriteIcon}
                                  >
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M16 18.657l2.138 1.197-.478-2.403 1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657zm-4.944 5.06l1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558L16 20.949l-4.944 2.768z"
                                    />
                                  </svg>
                                )}
                              </button>
                            </>
                          )}
                        </td>
                        <td>{file.server_modified}</td>
                        <td>
                          {file.size &&
                            (file.size * 0.000001).toFixed(2) + "MB"}
                        </td>
                        <td>
                          <div className={style.listDiv}>
                            {(!favorites && (
                              <Options
                                downloadFile={downloadFile}
                                file={file}
                                setModalDate={setModalDate}
                                setMoveToggle={setMoveToggle}
                                setDeleteToggle={setDeleteToggle}
                                setCopyToggle={setCopyToggle}
                                CopyOn={CopyOn}
                                moveOn={moveOn}
                                deleteOn={deleteOn}
                                location={location}
                              />
                            )) ||
                              ".."}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
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
