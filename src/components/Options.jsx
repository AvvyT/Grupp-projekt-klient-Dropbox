import React, { useState, useEffect, useRef } from "react";
import style from "./css/main.module.css";
import { Link } from "react-router-dom";
const Options = ({
  downloadFile,
  file,
  setModalDate,
  setMoveToggle,
  setDeleteToggle,
  ToggleNameChanger,
  moveOn,
  deleteOn,
  location,
  setCopyToggle,
  CopyOn,
  nameOn
}) => {
  const [listOn, setListToggle] = useState(false);
  const List = useRef();
  OnClickOutside(List, setListToggle);
  return (
    <>
      <div onClick={() => setListToggle(!listOn)} className="listToggleDiv">
        <span>
          <svg
            className="listToggleSpan"
            focusable="false"
            width="32"
            height="32"
            viewBox="0 0 32 32"
            role="img"
          >
            <g fill="none" fillRule="evenodd">
              <g fill="#637282">
                <circle cx="10.5" cy="16.5" r="1.8" />
                <circle cx="15.5" cy="16.5" r="1.8" />
                <circle cx="20.5" cy="16.5" r="1.8" />
              </g>
            </g>
          </svg>
        </span>
      </div>
      {listOn && (
        <ul ref={List} className={style.list}>
          <li onClick={() => downloadFile(file.id, file.name, file[".tag"])}>
            Download
          </li>
          <li
            onClick={() => {
              setModalDate({
                id: file.id,
                name: file.name,
                from_path: file.path_lower
              });
              setMoveToggle(!moveOn);
              setListToggle(!listOn);
            }}
          >
            <Link
              to={{
                pathname: "/move",
                state: { currentLocation: location.pathname }
              }}
            >
              Move
            </Link>
          </li>
          <li
            onClick={() => {
              setModalDate({
                id: file.id,
                name: file.name,
                from_path: file.path_lower
              });
              setCopyToggle(!CopyOn);
              setListToggle(!listOn);
            }}
          >
            <Link
              to={{
                pathname: "/copy",
                state: { currentLocation: location.pathname }
              }}
            >
              Copy
            </Link>
          </li>
          <li
            onClick={() => {
              setModalDate({
                id: file.id,
                name: file.name,
                from_path: file.path_lower
              });
              ToggleNameChanger(!nameOn);
              setListToggle(!listOn);
            }}
          >
            Rename
          </li>
          <li
            onClick={() => {
              setModalDate({
                id: file.id,
                name: file.name,
                file: file
              });
              setDeleteToggle(!deleteOn);
              setListToggle(!listOn);
            }}
          >
            Delete
          </li>
        </ul>
      )}
    </>
  );
};
function OnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (
        !ref.current ||
        ref.current.contains(event.target) ||
        event.target.className === "listToggleDiv" ||
        event.target.className === "listToggleSpan"
      )
        return;
      handler();
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [handler, ref]);
}
export default Options;
