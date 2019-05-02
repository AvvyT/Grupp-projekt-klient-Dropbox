import React from "react";

const Modal = ({ children, on, setToggle }) => {
  return (
    <div className="modalContainer">
      <div className="modalContent">
        <button className="modalCloseButton" onClick={() => setToggle(!on)}>
          <span role="img" aria-label="delete">
            ❌
          </span>
        </button>
        {children}
      </div>
    </div>
  );
};
export default Modal;
