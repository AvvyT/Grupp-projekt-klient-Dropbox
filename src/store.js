import { createContext } from "react";
//

export const DataContext = createContext({});
export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return { ...state, files: action.data };
    case "DELETE_FILE":
      let files = [...state.files];
      return {
        ...state,
        files: files.filter((file) => file.id !== action.file.id)
      };
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
