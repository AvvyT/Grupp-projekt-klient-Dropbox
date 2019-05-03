import React, { useState } from "react";
import { Link } from "react-router-dom";
import { dbx } from "./functions";
import style from "./css/main.module.css";
import Portal from "./Portal";
import Modal from "./Modal";
const FilesTable = ({
  files,
  storage,
  setStorage,
  location,
  children,
  FetchPath
}) => {
  const [deleteOn, setDeleteToggle] = useState(false);
  const [moveOn, setMoveToggle] = useState(false);
  const [modalData, setModalDate] = useState("");
  const [toPath, setToPath] = useState("");
  const handleFavorite = (file) => {
    if (storage.findIndex((x) => x.id === file.id) === -1) {
      let newStorage = [...storage, file];
      setStorage(newStorage);
    } else {
      let newStorage = storage.filter((index) => index.id !== file.id);
      setStorage(newStorage);
    }
  };
  const downloadFile = (id) => {
    dbx
      .filesDownload({ path: id })
      .then(function(response) {
        var blob = response.fileBlob;
        var reader = new window.FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = function() {
          var base64data = reader.result;
          window.open(base64data);
        };
      })
      .then((res) => {})
      .catch(function(error) {
        console.error(error);
      });
    return false;
  };
  const handleDelete = () => {
    dbx
      .filesDelete({ path: modalData.id })
      .then(() => setDeleteToggle(!deleteOn))
      .then(() => FetchPath())
      .then(() => {
        setModalDate("");
        setDeleteToggle(!deleteOn);
      });
  };
  const handleMove = () => {
    dbx
      .filesMove({
        from_path: modalData.from_path,
        to_path: toPath + "/" + modalData.name,
        allow_shared_folder: false,
        autorename: true,
        allow_ownership_transfer: false
      })
      .then((response) => console.log(response))
      .then(() => FetchPath())
      .then(() => {
        setModalDate("");
        setMoveToggle(!moveOn);
      });
  };
  return (
    <>
      {deleteOn && (
        <Portal>
          <Modal on={deleteOn} setToggle={setDeleteToggle}>
            <div className={style.deleteFileModal}>
              <h3>delete file {modalData.name}</h3>
              <div className={style.deleteFileModalButtons}>
                <button onClick={handleDelete}>delete</button>
                <button onClick={() => setDeleteToggle(!deleteOn)}>
                  cancel
                </button>
              </div>
            </div>
          </Modal>
        </Portal>
      )}
      {moveOn && (
        <Portal>
          <Modal on={moveOn} setToggle={setMoveToggle}>
            <div className={style.deleteFileModal}>
              <h3>move file {modalData.name}</h3>
              <h4>from :{modalData.from_path}</h4>
              <h4>to : </h4>
              <input
                onChange={(e) => setToPath(e.target.value)}
                value={toPath}
                placeholder="inter path"
              />
              <div className={style.deleteFileModalButtons}>
                <button onClick={handleMove}>Move</button>
                <button onClick={() => setMoveToggle(!moveOn)}>cancel</button>
              </div>
            </div>
          </Modal>
        </Portal>
      )}
      <div className={style.mainTableDisplayStyle}>
        <div className={style.mainTableDisplayStyle}>
          {files && files.length > 0 ? (
            <table className={style.tableStyle}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Modified</th>
                  <th>Size</th>
                  <th>-</th>
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
                            <Link
                              to={
                                location.pathname +
                                (location.pathname === "/" ? "" : "/") +
                                file.name
                              }
                            >
                              {file.name}
                            </Link>
                          ) : (
                            file.name
                          )}
                        </td>
                        <td>{file.server_modified}</td>
                        <td>
                          {file.size &&
                            (file.size * 0.000001).toFixed(2) + "MB"}
                        </td>
                        <td>
                          <div className={style.buttonsDiv}>
                            {file[".tag"] !== "folder" && (
                              <>
                                <button onClick={() => downloadFile(file.id)}>
                                  <span role="img" aria-label="download">
                                    🔽
                                  </span>
                                </button>
                                <button onClick={() => handleFavorite(file)}>
                                  {storage &&
                                  storage.findIndex((x) => x.id === file.id) !==
                                    -1 ? (
                                    <span role="img" aria-label="favorite">
                                      ❤️
                                    </span>
                                  ) : (
                                    <span role="img" aria-label="favorite">
                                      ➕
                                    </span>
                                  )}
                                </button>
                                <button
                                  className={style.deleteIcon}
                                  onClick={() => {
                                    setModalDate({
                                      id: file.id,
                                      name: file.name,
                                      from_path: file.path_lower
                                    });
                                    setMoveToggle(!moveOn);
                                  }}
                                >
                                  <span role="img" aria-label="delete">
                                    ▶️
                                  </span>
                                </button>
                              </>
                            )}
                            <button
                              className={style.deleteIcon}
                              onClick={() => {
                                setModalDate({ id: file.id, name: file.name });
                                setDeleteToggle(!deleteOn);
                              }}
                            >
                              <span role="img" aria-label="delete">
                                ❌
                              </span>
                            </button>
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
