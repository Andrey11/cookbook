import React from "react";
import { connect, Provider } from "react-redux";
import RecipeCard from "./RecipeCard.component";
import store from "../../store";

const mapStateToProps = (state: any, ownProps: any) => ({
  recipeId: ownProps.recipeId
  // numTags: selectors.getNumCompanyTags(state),
  // toggledTags: selectors.getToggledCompanyTags(state),
  // isAllTagsSelected: selectors.isAllCompanyTagsSelected(state),
  // currentSearchString: selectors.getCurrentSearchString(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  // showRecipeDetail: (id: number) => dispatch(actions.toggleCompanyTag(id))
  // showRecipeDetail: (id: number) => dispatch(actions.toggleCompanyTag(id))
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(RecipeCard);

const RecipeCardContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default RecipeCardContainer;
