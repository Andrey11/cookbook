import { AppDispatch, AppThunk } from "../../store";
import {
  loadCardList,
  onCardListLoaded,
  onCardListLoadError,
  onLoadCookbook,
  onLoadCookbookSuccess,
  onLoadCookbookError
} from "./CookbookSceneSlice";
import { Cookbook } from "./Cookbook.types";

import Firebase from "../firebase/Firebase";

export const loadCardDetails = (id: string) => (dispatch: AppDispatch) => {
  dispatch(loadCardList(id));
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
      const book: Cookbook = {
        id: querySnapshot.id,
        name: querySnapshot.data().name,
        recipes: []
      };
      dispatch(onLoadCookbookSuccess(book));
    })
    .catch(() => {
      dispatch(onLoadCookbookError("Error"));
    });
};
