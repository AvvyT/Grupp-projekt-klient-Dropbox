import React from "react";
import style from "./css/main.module.css";

const UploadProgress = ({
  idx,
  items,
  info,
  uploadDone,
  setUploadDisabled,
  setUploadDone,
  uploadDisabled,
  setInfo,
  setIdx,
  setItems,
  uploadedSize
}) => {
  const { name, size } = info;
  const procent = parseInt(1 + (idx / (items - 2)) * 100);
  if (uploadDone) {
    setTimeout(() => {
      setUploadDisabled(false);
      setUploadDone(false);
      setIdx(0);
      setItems(0);
      setInfo({ name: "", size: "" });
    }, 5000);
  }
  return (
    <div className={style.UploadProgress}>
      {!uploadDone ? (
        <div className={style.fileInfo}>
          <svg
            focusable="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            role="img"
            className="svgSpiner"
          >
            <path
              d="M12 5c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm-2.1 8.8l-1.1 1.1c-.7-.7-1.1-1.7-1.1-2.8 0-2.3 1.9-4.3 4.3-4.3V6.7l1.8 1.8-1.8 1.7v-.9c-1.5 0-2.8 1.2-2.8 2.8.1.6.3 1.2.7 1.7zm2.1 2.5v1l-1.8-1.8 1.8-1.8v1c1.5 0 2.8-1.2 2.8-2.8 0-.7-.2-1.3-.6-1.8L15.3 9c.7.8 1.1 1.7 1.1 2.8-.1 2.6-2 4.5-4.4 4.5z"
              fill="#0070E0"
            />
          </svg>
          <span> Uploading {name}</span>
          <span>{(size * 0.000001).toFixed(0) - uploadedSize + "MB"}</span>
        </div>
      ) : (
        <div className={style.fileInfo}>
          <svg
            focusable="false"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            role="img"
          >
            <path
              d="M12 5c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm-1.2 10.4L8 12.5l1.1-1.1 1.8 1.8 4.6-4.6 1.1 1.1-5.8 5.7z"
              fill="#057849"
            />
          </svg>
          <span> Uploaded {name} file done</span>
        </div>
      )}
      <div className={style.progressBarContainer}>
        <div
          className={style.progressBar}
          style={{ width: procent + "%", background: uploadDone && "#057849" }}
        />
      </div>
    </div>
  );
};
export default UploadProgress;
