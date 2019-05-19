import React, { useEffect, useContext, useRef, useCallback } from "react";
import { FetchPath, useLocalStorage } from "./functions";
import FilesTable from "./FilesTable";
import { DataContext } from "../store";
import style from "./css/main.module.css";
import { Dropbox } from "dropbox";

const Main = ({ location, history }) => {
  const [storage, setStorage] = useLocalStorage("favorites", []);
  const { state, dispatch } = useContext(DataContext);
  const { files, searchActive, createFolder } = state;
  let dbx = new Dropbox({
    accessToken: window.localStorage.getItem("token"),
    clientId: "qwcieudyqiph2un",
    fetch
  });
  const fetchData = useCallback(
    (data) => {
      dispatch({
        type: "FETCH_DATA",
        data,
        searchActive: false
      });
    },
    [dispatch]
  );

  const intervalRef = useRef(null);
  //console.log(state.createFolder);
  useEffect(() => {
    if (!searchActive && !createFolder) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      intervalRef.current = setInterval(() => {
        if (
          !location.pathname.includes("/move") &&
          !location.pathname.includes("/copy")
        ) {
          FetchPath(fetchData, location.pathname, dbx);
        }
      }, 1000);
    } else if (searchActive || createFolder) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  }, [searchActive, location.pathname, fetchData, dbx, createFolder]);
  return (
    <FilesTable
      files={files}
      storage={storage}
      setStorage={setStorage}
      location={location}
      FetchPath={() => FetchPath(fetchData, location.pathname)}
      history={history}
    >
      {state.files && state.files.length === 0 ? (
        state.searchActive ? (
          <div className={style.searchDiv}>
            <p>no similar files or folder</p>
            <button
              onClick={() => {
                dispatch({ type: "SEARCH_OFF" });
                history.push("/");
              }}
            >
              Cancel
            </button>
          </div>
        ) : (
          "This folder is empty"
        )
      ) : (
        <div className="spinner" />
      )}
    </FilesTable>
  );
};
export default Main;
// const intervalRef = useRef(null);

// useEffect(() => {
//   if (!searchActive) {
//     intervalRef.current = setInterval(...);
//   } else {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   }

//   return () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//     }
//   }
// }, [searchActive]);
