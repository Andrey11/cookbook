import React from "react";
import { connect, Provider } from "react-redux";
import RecipeCard from "./RecipeCard.component";
import store from "../../store";

const mapStateToProps = (state: any, ownProps: any) => ({
  recipeId: ownProps.recipeId,
  imageUrl: ownProps.imageUrl,
  recipeTitle: state.recipeTitle
});

const mapDispatchToProps = (dispatch: any) => ({
  // loadRecipe: (id: number) => dispatch(actions.toggleCompanyTag(id))
  // loadRecipe: (id: number) => dispatch(actions.toggleCompanyTag(id))
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(RecipeCard);

const RecipeCardContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default RecipeCardContainer;
