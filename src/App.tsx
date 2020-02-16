import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import Counter from "./features/counter/Counter";
import { Provider } from "react-redux";
import store from "./store";
import { Button } from "@rmwc/button";
import "@material/button/dist/mdc.button.css";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Counter />
          <Button>Hello</Button>
        </header>
      </div>
    </Provider>
  );
};

export default App;
