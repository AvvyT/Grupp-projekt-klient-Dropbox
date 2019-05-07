import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="modalContainer">
      <div className="modalContent">{children}</div>
    </div>
  );
};
export default Modal;
