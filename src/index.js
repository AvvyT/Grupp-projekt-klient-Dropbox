import React, { useContext, useReducer } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./style.css";
import { reducer, DataContext } from "./store";
import * as serviceWorker from "./serviceWorker";
import Callback from "./components/callback";
import Display from "./components/Display";

const App = () => {
  const initialState = useContext(DataContext);
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      <Switch>
        <Route path="/callback" exact component={Callback} />
        <Route path="/" component={Display} />
      </Switch>
    </DataContext.Provider>
  );
};
ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
/*eslint no-restricted-globals : 0 */
serviceWorker.unregister();
