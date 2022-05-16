/* eslint-disable react/display-name */
import React from "react";

const FirebaseContext = React.createContext({});

export const withFirebase = (Component: any) => (props: any) =>
  (
    <FirebaseContext.Consumer>
      {(firebase) => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
  );

export default FirebaseContext;
