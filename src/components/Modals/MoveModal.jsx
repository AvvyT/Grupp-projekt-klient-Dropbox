import React, { useRef } from "react";
import Modal from "../Modal";
import Portal from "../Portal";

const MoveModal = ({ name, moveOn, setMoveToggle, handleMove }) => {
  const input = useRef();
  return (
    <Portal>
      <Modal on={moveOn} setToggle={setMoveToggle}>
        <div>
          <h4>Move Item</h4>
          <hr />
          <div>
            <p>Move {name} To</p>
            <form>
              <input ref={input} type="text" placeholder="To Folder" />
            </form>
          </div>
          <div>
            <button onClick={() => handleMove(input.current.value)}>
              Move
            </button>
            <button onClick={() => setMoveToggle(!moveOn)}>Cancel</button>
          </div>
        </div>
      </Modal>
    </Portal>
  );
};
export default MoveModal;
