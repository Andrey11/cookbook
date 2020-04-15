import React from "react";
import { connect, Provider } from "react-redux";
import Scene from "./Scene.component";
import store from "../../store";
import {
  logout,
  checkAuthState
} from "../authentication/Authentication.actions";
import { withFirebase } from "../firebase/Firebase";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: any, ownProps: any) => ({
  sceneName: ownProps.sceneName,
  children: ownProps.children,
  isFirebaseInitialized: state.userInfo.isFirebaseInitialized
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  logoutUser: () => dispatch(logout(ownProps.firebase)),
  verityAuthState: () => dispatch(checkAuthState(ownProps.firebase))
});

const Connected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Scene)
);

const SceneContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(SceneContainer);
