import React from "react";
import { connect, Provider } from "react-redux";
import CookbookScene from "./CookbookScene.component";
import store from "../../store";
import { loadCardList } from "./CookbookSceneSlice";
import { loadCookbook } from "./CookbookScene.actions";
import { logout } from "../authentication/Authentication.actions";
import { withFirebase } from "../firebase/Firebase";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: any, ownProps: any) => ({
  cookbookId: state.cookbook.cookbookId || state.userInfo.cookbookId,
  recipes: state.recipes,
  loaded: state.cookbook.loaded,
  shouldLogout: state.userInfo.loggedIn === false
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  loadRecipe: (id: string) => dispatch(loadCardList(id)),
  loadCookbook: (id: string) => dispatch(loadCookbook(id, ownProps.firebase)),
  logoutUser: () => dispatch(logout(ownProps.firebase))
});

const Connected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(CookbookScene)
);

// TODO: should pass a list of card items (recipes)
const CookbookSceneContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(CookbookSceneContainer);
