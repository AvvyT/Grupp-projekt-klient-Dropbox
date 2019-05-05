import React from "react";
import Modal from "../Modal";
import Portal from "../Portal";
const DeleteModal = ({ name, setDeleteToggle, deleteOn, handleDelete }) => {
  return (
    <Portal>
      <Modal>
        <div>
          <h4>Delete file ?</h4>
          <hr />
          <div>
            <p>Do you want to delete {name}?</p>
          </div>
          <div>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={() => setDeleteToggle(!deleteOn)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </Portal>
  );
};
export default DeleteModal;
