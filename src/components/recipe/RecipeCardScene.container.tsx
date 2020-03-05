import React from "react";
import { connect, Provider } from "react-redux";
import RecipeCardScene from "./RecipeCardScene.component";
import store from "../../store";
import { loadCardList } from "./RecipeCardSceneSlice";
import { loadCookbook } from "./RecipeCardScene.actions";
import { withFirebase } from "../firebase/Firebase";

const mapStateToProps = (state: any, ownProps: any) => ({
  cookbookId: state.cookbook.cookbookId || ownProps.cookbookId,
  recipes: state.recipes,
  loaded: state.cookbook.loaded
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  loadRecipe: (id: string) => dispatch(loadCardList(id)),
  loadCookbook: (id: string) => dispatch(loadCookbook(id, ownProps.firebase))
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(RecipeCardScene);

// TODO: should pass a list of card items (recipes)
const RecipeCardSceneContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(RecipeCardSceneContainer);
