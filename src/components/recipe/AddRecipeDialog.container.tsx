import React from "react";
import { connect, Provider } from "react-redux";
import { withFirebase } from "../firebase/Firebase";
import AddRecipeDialog from "./AddRecipeDialog.component";
import {
  createRecipe,
  createRecipeNameChange,
  createRecipeImageUrlChange,
  hideCreateRecipeDialog,
} from "../cookbook/CookbookScene.actions";
import store from "../../store";
import { Url } from "url";

const mapStateToProps = (state: any, ownProps: any) => ({
  name: state.data.createrecipe.name,
  imageUrl: state.data.createrecipe.imageUrl,
  visible: state.data.createrecipe.visible || ownProps.visible,
  created: state.data.createrecipe.created,
});

const mapDispatchToProps = (dispatch: any) => ({
  onNameChange: (name: string) => dispatch(createRecipeNameChange(name)),
  onImageUrlChange: (url: Url) => dispatch(createRecipeImageUrlChange(url)),
  onRecipeCreate: (name: string) => dispatch(createRecipe(name)),
  onCloseDialog: () => dispatch(hideCreateRecipeDialog()),
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(AddRecipeDialog);

const AddRecipeDialogContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(AddRecipeDialogContainer);
