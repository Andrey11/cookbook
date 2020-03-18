import React from "react";
import { connect, Provider } from "react-redux";
import Login from "./Login.component";
import store from "../../store";
import { withRouter } from "react-router-dom";
import { login } from "./Authentication.actions";
import { withFirebase } from "../firebase/Firebase";

const mapStateToProps = (state: any, ownProps: any) => ({
  username: state.userInfo.username, // "user1@test.com",
  password: state.userInfo.password, // "password",
  isLoggedIn: state.userInfo.loggedIn,
  cookbookId: state.userInfo.cookbookId //"MVNzqtXaUq7HJq0PgOrn"
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  loginUser: (username: string, password: string) =>
    dispatch(login(username, password, ownProps.firebase))
});

const Connected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);

const LoginContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(LoginContainer);
