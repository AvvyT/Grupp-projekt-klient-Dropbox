import { createContext } from "react";
//

export const DataContext = createContext({});
export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      console.log(action.data);
      return { ...state, files: action.data };
    case "deleteFile":
      return;
    case "createFolder":
      return;
    case "downloadFile":
      return;
    case "handleFavorite":
      return;
    default:
      return state;
  }
};
