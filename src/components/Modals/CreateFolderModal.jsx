import React, { useRef } from "react";
import Modal from "../Modal";
import Portal from "../Portal";

const CreateFolder = ({ on, setToggle, handleCreateFolder }) => {
  const input = useRef();
  return (
    <Portal>
      <Modal on={on} setToggle={setToggle}>
        <div>
          <h4>Create Folder</h4>
          <hr />
          <div>
            <form>
              <input ref={input} type="text" placeholder="folder Name" />
            </form>
          </div>
          <div>
            <button onClick={() => handleCreateFolder(input.current.value)}>
              Move
            </button>
            <button onClick={() => setToggle(!on)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </Portal>
  );
};
export default CreateFolder;
