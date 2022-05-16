import React from "react";
import { connect, Provider } from "react-redux";
import CookbookScene from "./CookbookScene.component";
import store from "../../store";
import { loadCookbook, showCreateRecipeDialog } from "./CookbookScene.actions";
// import { } from "./CookbookScene.reducer";
import { logout } from "../authentication/Authentication.actions";
import { withFirebase } from "../firebase/Firebase";
import * as selector from "./CookbookScene.selector";

const mapStateToProps = (state: any) => ({
  cookbookId: selector.getCookbookId(state),
  recipes: selector.recipesList(state),
  loaded: state.data.cookbook.loaded,
  loading: state.data.cookbook.loading,
  isFirebaseInitialized: selector.isFirebaseInitialized(state),
  shouldLoadCookbook: selector.shouldLoadCookbook(state),
  shouldLogout: selector.shouldLogout(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  loadCookbook: (id: string) => dispatch(loadCookbook(id)),
  logoutUser: () => dispatch(logout()),
  showCreateRecipeDialog: () => dispatch(showCreateRecipeDialog()),
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(CookbookScene);

// TODO: should pass a list of card items (recipes)
const CookbookSceneContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(CookbookSceneContainer);
