import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import Firebase, { FirebaseContext } from "./components/firebase/Firebase";

import "rmwc/dist/styles";
import "./index.scss";

import * as serviceWorker from "./serviceWorker";

const container = document.getElementById("root");
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <BrowserRouter>
    <FirebaseContext.Provider value={Firebase.getInstance()}>
      <App />
    </FirebaseContext.Provider>
  </BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
