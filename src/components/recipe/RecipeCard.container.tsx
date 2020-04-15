import React from "react";
import { connect, Provider } from "react-redux";
import { withFirebase } from "../firebase/Firebase";
import RecipeCard from "./RecipeCard.component";
import { loadRecipe } from "../cookbook/CookbookScene.actions";
import store from "../../store";
import * as selector from "./RecipeCard.selector";

const mapStateToProps = (state: any, ownProps: any) => ({
  recipeId: ownProps.recipeId,
  imageUrl: ownProps.imageUrl,
  recipeTitle: selector.getRecipeTitle(state, ownProps.recipeId),
  isLoaded:
    selector.isRecipeLoaded(state, ownProps.recipeId) || ownProps.isLoaded
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  loadData: (id: string) => dispatch(loadRecipe(id, ownProps.firebase))
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(RecipeCard);

const RecipeCardContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(RecipeCardContainer);
