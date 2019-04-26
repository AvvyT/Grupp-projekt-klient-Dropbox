import { createStore } from "redux";
const initialState = {
  files: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_DATA":
      return {
        ...state,
        files: [...action.data.files]
      };
    default:
      return state;
  }
};

const store = createStore(reducer);
export default store;
