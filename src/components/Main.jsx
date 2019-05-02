import React, { useEffect, useState } from "react";
import { FetchPath, useLocalStorage } from "./functions";
import FilesTable from "./FilesTable";

const Main = ({ location }) => {
  const [files, setFiles] = useState([]);
  const [storage, setStorage] = useLocalStorage("favorites", []);
  useEffect(() => {
    FetchPath(setFiles, location.pathname.replace("/files", ""));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <FilesTable
      files={files}
      storage={storage}
      setStorage={setStorage}
      location={location}
      FetchPath={() =>
        FetchPath(setFiles, location.pathname.replace("/files", ""))
      }
    >
      <div className="spiner" />
    </FilesTable>
  );
};
export default Main;
