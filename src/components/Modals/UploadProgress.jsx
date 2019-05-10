import React, { useContext, useEffect, useRef } from "react";
import NotificationsModal from "../NotificationsModal";
import Portal from "../Portal";
import style from "../css/main.module.css";
import { DataContext } from "../../store";

const UploadProgress = () => {
  const { state } = useContext(DataContext);
  const { items, idx } = state;

  const procent = parseInt(1 + (idx / items) * 100);

  return (
    <div className={style.UploadProgress}>
      <div className={style.fileInfo}>
        <span>spinner-</span>name : name; size:size
      </div>
      <div className={style.progressBarContainer}>
        <div className={style.progressBar} style={{ width: procent + "%" }} />
      </div>
    </div>
  );
};
export default UploadProgress;
