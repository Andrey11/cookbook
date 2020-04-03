import React from "react";
import { connect, Provider } from "react-redux";
import CreateAccount from "./CreateAccount.component";
import store from "../../store";
import { withRouter } from "react-router-dom";
import { createAccount } from "./Authentication.actions";
import { withFirebase } from "../firebase/Firebase";

const mapStateToProps = (state: any) => ({
  loggedIn: state.userInfo.loggedIn,
  cookbookId: state.userInfo.cookbookId
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  createUser: (username: string, password: string) =>
    dispatch(createAccount(username, password, ownProps.firebase))
});

const Connected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CreateAccount)
);

const CreateAccountContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(CreateAccountContainer);
