import React from "react";
import { connect, Provider } from "react-redux";
import Header from "./Header.component";
import store from "../../store";
import { logout } from "../authentication/Authentication.actions";
import { withFirebase } from "../firebase/Firebase";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: any, ownProps: any) => ({
  type: ownProps.type || "default"
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  logoutUser: () => dispatch(logout(ownProps.firebase))
});

const Connected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);

const HeaderContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(HeaderContainer);
