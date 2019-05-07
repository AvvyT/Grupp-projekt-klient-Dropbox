import React, { useRef } from "react";
import Modal from "../Modal";
import Portal from "../Portal";
import style from "../css/main.module.css";
import MoveFolderTable from "../MoveFolderTable";
import { Route } from "react-router-dom";

let thumbnail = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' focusable='false' width='40' height='40' viewBox='0 0 40 40' class='mc-icon mc-icon-template-content mc-icon-template-content--folder-small brws-file-name-cell-icon' role='img'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cpath d='M18.422 11h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 32 5 31.331 5 30.507V9.493C5 8.663 5.671 8 6.5 8h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2371B9F4'%3E%3C/path%3E%3Cpath d='M18.422 10h15.07c.84 0 1.508.669 1.508 1.493v18.014c0 .818-.675 1.493-1.508 1.493H6.508C5.668 31 5 30.331 5 29.507V8.493C5 7.663 5.671 7 6.5 7h7.805c.564 0 1.229.387 1.502.865l1.015 1.777s.4.358 1.6.358z' fill='%2392CEFF'%3E%3C/path%3E%3C/g%3E%3C/svg%3E`;
const CopyModal = ({
  history,
  location,
  name,
  CopyOn,
  setCopyToggle,
  handleCopy,
  action
}) => {
  const input = useRef();
  return (
    <Portal>
      <Modal>
        <div className={style.ModalMainDiv}>
          <div className={style.ModalHeader}>
            <p>Copy item to...</p>
          </div>
          <div className={style.ModalBody}>
            <div className={style.ModalBodyDiv}>
              <button
                onClick={
                  location.pathname !== "/copy" ? () => history.goBack() : null
                }
              >
                <span>&#8592;</span>
              </button>
              Copy item To
              <img className={style.iconImgStyle} alt="icon" src={thumbnail} />
              <span className={style.ModalBodyDivSpan}>
                {location.pathname
                  .replace("/copy", "Files")
                  .split("/")
                  .reverse()[0]
                  .toUpperCase()}
              </span>
              {"  "}
              folder
            </div>
            <div className={style.modalRoutsDiv}>
              <input ref={input} placeholder="change the name" />
              <Route
                path="/copy"
                component={(props) => (
                  <MoveFolderTable {...props} action={action} />
                )}
              />
            </div>
            <div className={style.ModalButtons}>
              <button onClick={() => handleCopy()}>Copy</button>
              <button onClick={() => setCopyToggle(!CopyOn)}>Cancel</button>
            </div>
          </div>
        </div>
      </Modal>
    </Portal>
  );
};
export default CopyModal;
