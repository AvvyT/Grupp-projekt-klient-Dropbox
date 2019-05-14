import React, { useRef } from "react";
import Modal from "../Modal";
import Portal from "../Portal";
import style from "../css/main.module.css";
const CreateFolder = ({ on, setToggle, handleCreateFolder }) => {
  const input = useRef();
  return (
    <Portal>
      <Modal>
        <div className={style.ModalMainDiv}>
          <div className={style.ModalHeader}>
            <p>New folder...</p>
          </div>
          <div>
            <form
              className={style.ModalBody}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={style.ModalBodyDiv}>Create a folder att</div>
              <div className={style.createFolderInputDiv}>
                <input
                  ref={input}
                  type="text"
                  placeholder="Name"
                  className={style.createFolderInput}
                  required
                />
              </div>
              <div className={style.ModalButtons}>
                <button onClick={() => handleCreateFolder(input.current.value)}>
                  Create
                </button>
                <button onClick={() => setToggle(!on)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </Portal>
  );
};
export default CreateFolder;
