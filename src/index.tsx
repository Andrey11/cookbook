import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import App from "./App";
import Firebase, { FirebaseContext } from "./components/firebase/Firebase";

import "rmwc/dist/styles";
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
