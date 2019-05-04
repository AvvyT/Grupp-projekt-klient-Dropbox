import React, { useState, useEffect, useRef } from "react";
import style from "./css/main.module.css";
const Options = ({
  downloadFile,
  file,
  setModalDate,
  setMoveToggle,
  setDeleteToggle,
  moveOn,
  deleteOn
}) => {
  const [listOn, setListToggle] = useState(false);
  const List = useRef();
  OnClickOutside(List, setListToggle);
  return (
    <>
      <div onClick={() => setListToggle(!listOn)} className="listToggleDiv">
        <span className="listToggleSpan">...</span>
      </div>
      {listOn && (
        <ul ref={List} className={style.list}>
          {file[".tag"] !== "folder" && (
            <li onClick={() => downloadFile(file.id)}>Download</li>
          )}
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
            Move
          </li>
          <li
            onClick={() => {
              setModalDate({
                id: file.id,
                name: file.name
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
