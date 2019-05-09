import React, { useEffect, useContext } from "react";
import { FetchPath, useLocalStorage } from "./functions";
import FilesTable from "./FilesTable";
import { DataContext } from "../store";
import style from "./css/main.module.css";

const Main = ({ location, history }) => {
  const [storage, setStorage] = useLocalStorage("favorites", []);
  const { state, dispatch } = useContext(DataContext);
  const { files, searchActive } = state;
  const fetchData = (data) => {
    dispatch({
      type: "FETCH_DATA",
      data,
      searchActive: false
    });
  };
  useEffect(
    () => {
      let update;
      if (!searchActive && update) {
        clearInterval(update);
      } else if (
        !location.pathname.includes("/move") &&
        !location.pathname.includes("/copy")
      ) {
        update = setInterval(
          () =>
            FetchPath((x) => !searchActive && fetchData(x), location.pathname),
          1000
        );
      }

      return () => clearInterval(update);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );
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
            <button onClick={() => history.push("/")}>Cancel</button>
          </div>
        ) : (
          "This folder is empty"
        )
      ) : (
        <div className="spiner" />
      )}
    </FilesTable>
  );
};
export default Main;
