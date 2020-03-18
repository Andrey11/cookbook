import React from "react";
import { connect, Provider } from "react-redux";
import Default from "./Default.component";
import store from "../../store";
import { withFirebase } from "../firebase/Firebase";
import { withRouter } from "react-router-dom";

const mapStateToProps = () => ({
  type: "default"
  // recipes: state.recipes,
  // loaded: state.cookbook.loaded,
  // shouldLogout: false // state.userInfo.loggedIn === false
});

const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
  // loadRecipe: (id: string) => dispatch(beginLoadCardList(id)),
  // loadCookbook: (id: string) => dispatch(loadCookbook(id, ownProps.firebase)),
  // logoutUser: () => dispatch(logout(ownProps.firebase))
});

const Connected = withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Default)
);

// TODO: should pass a list of card items (recipes)
const DefaultContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(DefaultContainer);
