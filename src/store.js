import { createContext } from "react";
//

export const DataContext = createContext({ createFolder: false });
export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      if (state.searchActive) {
        return state;
      }

      return {
        ...state,
        files: action.data,
        searchActive: action.searchActive
      };
    case "DELETE_FILE":
      let files = [...state.files];
      return {
        ...state,
        files: files.filter((file) => file.id !== action.file.id)
      };
    case "CHANGE_NAME": {
      let files = [...state.files];
      const { server_modified, path_lower, path_display, name } = action.file;
      files.map((file) => {
        if (file.id === action.id) {
          file.name = name;
          file.path_display = path_display;
          file.path_lower = path_lower;
          file.server_modified = server_modified;
          return file;
        }
        return file;
      });
      return { ...state, files };
    }
    case "SEARCH_OFF":
      return {
        ...state,
        searchActive: false
      };
    case "CREATE_FOLDER_ON":
      return {
        ...state,
        createFolder: true
      };
    case "CREATE_FOLDER_OF":
      return {
        ...state,
        createFolder: false
      };
    default:
      return state;
  }
};
