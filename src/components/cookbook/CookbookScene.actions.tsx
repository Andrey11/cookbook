import { AppDispatch, AppThunk } from "../../store";
import {
  beginLoadCardList,
  onCardListLoaded,
  onCardListLoadError,
  onLoadCookbook,
  onLoadCookbookSuccess,
  onLoadCookbookError
} from "./CookbookScene.reducer";
import { Cookbook } from "./Cookbook.types";

import Firebase from "../firebase/Firebase";

export const loadRecipeDetails = (id: string) => (dispatch: AppDispatch) => {
  dispatch(beginLoadCardList(id));
  try {
    dispatch(onCardListLoaded([]));
  } catch (e) {
    dispatch(onCardListLoadError("Something went wrong."));
  }
};

export const loadCookbook = (id: string, firebase: Firebase) => (
  dispatch: AppDispatch
) => {
  dispatch(onLoadCookbook(id));

  firebase
    .doLoadCookbookRecipies(id)
    .get()
    .then((querySnapshot: any) => {
      console.log(`${querySnapshot.id} => ${querySnapshot.data().name}`);
      const recipeIds = querySnapshot.data().recipes.map((item: any) => {
        return item.id;
      });

      const book: Cookbook = {
        id: querySnapshot.id,
        name: querySnapshot.data().name,
        recipes: recipeIds
      };
      dispatch(onLoadCookbookSuccess(book));
    })
    .catch(() => {
      dispatch(onLoadCookbookError("Error"));
    });
};
