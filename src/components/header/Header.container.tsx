import React from "react";
import { connect, Provider } from "react-redux";
import Header from "./Header.component";
import store from "../../store";
import { logout } from "../authentication/Authentication.actions";
import { withFirebase } from "../firebase/Firebase";
import { HEADER_TYPE } from "./Header.types";

const mapStateToProps = (state: any, ownProps: any) => ({
  type: ownProps.type || HEADER_TYPE.DEFAULT,
});

const mapDispatchToProps = (dispatch: any) => ({
  logoutUser: () => dispatch(logout()),
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(Header);

const HeaderContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(HeaderContainer);
