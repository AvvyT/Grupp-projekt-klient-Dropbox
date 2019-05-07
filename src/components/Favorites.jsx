import React from "react";
import { useLocalStorage } from "./functions";
import FilesTable from "./FilesTable";

const Favorites = ({ location }) => {
  const [files, setFiles] = useLocalStorage("favorites", []);
  return (
    <FilesTable
      files={files}
      location={location}
      setStorage={setFiles}
      storage={files}
      favorites={true}
    >
      <p>no favorites</p>
    </FilesTable>
  );
};
export default Favorites;
