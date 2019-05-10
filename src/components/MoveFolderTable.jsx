import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./css/main.module.css";
import { FetchPath } from "./functions";
let thumbnail = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' focusable='false' width='40' height='40' viewBox='0 0 40 40' class='mc-icon mc-icon-template-content mc-icon-template-content--folder-small brws-file-name-cell-icon' role='img'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2371B9F4'%3E%3C/path%3E%3Cpath d='M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2392CEFF'%3E%3C/path%3E%3C/g%3E%3C/svg%3E`;
const MoveFolderTable = ({ location, action, dbx }) => {
  const [files, setFiles] = useState(null);
  useEffect(
    () => {
      let isMount = true;
      FetchPath(
        (files) => {
          if (isMount) {
            setFiles(files);
          }
        },
        location.pathname.replace("/" + action, ""),
        dbx
      );
      return () => {
        isMount = false;
      };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location.pathname]
  );

  return (
    <>
      {files === null ? (
        <div className={style.spinerDiv}>
          <div className="spiner" />
          Loading your files ...
        </div>
      ) : files.length === 0 ? (
        <div className={style.spinerNoFolders}>
          {" "}
          there is no folders here ...
        </div>
      ) : (
        files.map((file) => {
          if (file[".tag"] === "folder") {
            return (
              <div key={file.id + "move"} className={style.MoveFolderLinks}>
                <img
                  className={style.iconImgStyle}
                  alt="icon"
                  src={thumbnail}
                />
                <Link
                  to={{
                    pathname:
                      location.pathname +
                      (location.pathname === "/" ? "" : "/") +
                      file.name,
                    state: { currentLocation: location.state.currentLocation }
                  }}
                >
                  {file.name}
                </Link>
              </div>
            );
          }
          return null;
        })
      )}
    </>
  );
};
export default MoveFolderTable;
