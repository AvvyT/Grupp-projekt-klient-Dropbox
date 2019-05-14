import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./css/main.module.css";
const ChangeName = ({
  thumbnail,
  file,
  handleFavorite,
  handleRename,
  storage,
  ToggleNameChanger,
  nameOn,
  renameProgress,
  setRenameProgress
}) => {
  const input = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRename(input.current.value, renameProgress, setRenameProgress);
    ToggleNameChanger(!nameOn);
  };
  useEffect(() => {
    nameOn && input.current.focus();
  }, [nameOn]);
  return (
    <>
      <td>
        <img className={style.iconImgStyle} alt="icon" src={thumbnail} />
        {nameOn ? (
          <form className={style.changeNameForm} onSubmit={handleSubmit}>
            <input
              ref={input}
              placeholder={file.name}
              className={style.changeNameInput}
            />
          </form>
        ) : file[".tag"] === "folder" ? (
          <Link to={file.path_lower}>
            {renameProgress ? (
              <p style={{ color: "#007ee5" }}>Renaming...</p>
            ) : (
              file.name
            )}
          </Link>
        ) : (
          <>
            {renameProgress ? (
              <p style={{ color: "#007ee5" }}>Renaming...</p>
            ) : (
              file.name
            )}
            <button
              onClick={() => handleFavorite(file)}
              className={style.favoriteButton}
            >
              {storage && storage.findIndex((x) => x.id === file.id) !== -1 ? (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  className={style.favoriteIconOn}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 20.95l-4.944 2.767 1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558L16 20.949z"
                  />
                </svg>
              ) : (
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  className={style.favoriteIcon}
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 18.657l2.138 1.197-.478-2.403 1.799-1.663-2.433-.289L16 13.275l-1.026 2.224-2.433.289 1.799 1.663-.478 2.403L16 18.657zm-4.944 5.06l1.104-5.558L8 14.312l5.627-.667L16 8.5l2.373 5.145 5.627.667-4.16 3.847 1.104 5.558L16 20.949l-4.944 2.768z"
                  />
                </svg>
              )}
            </button>
          </>
        )}
      </td>
    </>
  );
};

export default ChangeName;
