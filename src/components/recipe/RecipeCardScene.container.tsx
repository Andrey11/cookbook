import React from "react";
import { connect, Provider } from "react-redux";
import RecipeCardScene from "./RecipeCardScene.component";
import store from "../../store";
import { beginLoadCardList } from "./RecipeCardSceneSlice";
import { loadCookbook } from "./RecipeCardScene.actions";
import { logout } from "../authentication/Authentication.actions";
import { withFirebase } from "../firebase/Firebase";
import { withRouter } from "react-router-dom";

const mapStateToProps = (state: any, ownProps: any) => ({
  cookbookId: state.cookbook.cookbookId || ownProps.cookbookId,
  recipes: state.recipes,
  loaded: state.cookbook.loaded,
  shouldLogout: state.userInfo.loggedIn === false
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  loadRecipe: (id: string) => dispatch(beginLoadCardList(id)),
  loadCookbook: (id: string) => dispatch(loadCookbook(id, ownProps.firebase)),
  logoutUser: () => dispatch(logout(ownProps.firebase))
});

const Connected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(RecipeCardScene)
);

// TODO: should pass a list of card items (recipes)
const RecipeCardSceneContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(RecipeCardSceneContainer);
