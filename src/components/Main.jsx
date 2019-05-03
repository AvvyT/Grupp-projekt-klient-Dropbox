import React, { useEffect, useContext } from "react";
import { FetchPath, useLocalStorage } from "./functions";
import FilesTable from "./FilesTable";
import { DataContext } from "../store";

const Main = ({ location }) => {
  const [storage, setStorage] = useLocalStorage("favorites", []);
  const { state, dispatch } = useContext(DataContext);
  const { files } = state;
  const fetchData = (data) => {
    dispatch({
      type: "FETCH_DATA",
      data
    });
  };
  useEffect(
    () => {
      FetchPath(fetchData, location.pathname.replace("/files", ""));
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
      FetchPath={() =>
        FetchPath(fetchData, location.pathname.replace("/files", ""))
      }
    >
      {state.files && state.files.length === 0 ? (
        "This folder is empty"
      ) : (
        <div className="spiner" />
      )}
    </FilesTable>
  );
};
export default Main;
