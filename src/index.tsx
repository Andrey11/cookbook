import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import Firebase, { FirebaseContext } from "./components/firebase/Firebase";

import "@material/button/dist/mdc.button.css";
import "@material/card/dist/mdc.card.css";
import "@material/chips/dist/mdc.chips.css";
import "@material/dialog/dist/mdc.dialog.css";
import "@material/fab/dist/mdc.fab.css";
import "@material/floating-label/dist/mdc.floating-label.css";
import "@material/icon-button/dist/mdc.icon-button.css";
import "@material/layout-grid/dist/mdc.layout-grid.css";
import "@material/line-ripple/dist/mdc.line-ripple.css";
import "@material/notched-outline/dist/mdc.notched-outline.css";
import "@material/ripple/dist/mdc.ripple.css";
import "@material/textfield/dist/mdc.textfield.css";
import "@material/theme/dist/mdc.theme.css";
import "@material/top-app-bar/dist/mdc.top-app-bar.css";
import "@material/typography/dist/mdc.typography.css";
import "@rmwc/avatar/avatar.css";
import "@rmwc/icon/icon.css";

import "./index.scss";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <HashRouter>
    <FirebaseContext.Provider value={Firebase.getInstance()}>
      <App />
    </FirebaseContext.Provider>
  </HashRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
