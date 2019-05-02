import { useContext } from "react";
import { Dropbox } from "dropbox";
const initialState = {
  files: [],
  dbx: new Dropbox({
    accessToken: window.localStorage.getItem("token") || null,
    clientId: "qwcieudyqiph2un",
    fetch
  })
};
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "deleteFile":
      const deleteFile = null;
      return;
    case "fetchData":
      const fetchData = null;
      return;
    case "createFolder":
      const createFolder = null;
      return;
    case "downloadFile":
      const downloadFile = null;
      return;
    case "handleFavorite":
      const handleFavorite = null;
    default:
      return state;
  }
};
