import React from "react";
import Modal from "../Modal";
import Portal from "../Portal";
const RenameModal = ({ fileName }) => {
  return (
    <Portal>
      <Modal>
        <div>
          <h4>Rename Item</h4>
          <hr />
          <div>
            <p>Rename Item To</p>
            <form>
              <input type="text" placeholder="To Folder" />
            </form>
          </div>
          <div>
            <button>Rename</button>
            <button>Cancel</button>
          </div>
        </div>
      </Modal>
    </Portal>
  );
};
export default RenameModal;
