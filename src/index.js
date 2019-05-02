import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./style.css";
import * as serviceWorker from "./serviceWorker";
import Callback from "./components/callback";
import Display from "./components/Display";

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/callback" exact component={Callback} />
      <Route path="/" component={Display} />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
/*eslint no-restricted-globals : 0 */
serviceWorker.unregister();
