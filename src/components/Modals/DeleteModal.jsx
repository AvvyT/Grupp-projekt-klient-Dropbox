import React from "react";
import Modal from "../Modal";
import Portal from "../Portal";
import style from "../css/main.module.css";
const DeleteModal = ({ name, setDeleteToggle, deleteOn, handleDelete }) => {
  return (
    <Portal>
      <Modal>
        <div className={style.ModalMainDiv}>
          <div className={style.ModalHeader}>
            <h4>Delete !</h4>
          </div>
          <div className={style.ModalBody}>
            <div className={style.ModalBodyDiv}>
              <div className={style.removeFileModalBody}>
                <p>
                  Are you sure you want to delete <strong>{name}</strong> from
                  your Dropbox?
                </p>
              </div>
            </div>
            <div className={style.ModalButtons}>
              <button onClick={handleDelete}>Delete</button>
              <button onClick={() => setDeleteToggle(!deleteOn)}>Cancel</button>
            </div>
          </div>
        </div>
      </Modal>
    </Portal>
  );
};
export default DeleteModal;
