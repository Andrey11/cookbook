import React from "react";
import { connect, Provider } from "react-redux";
import Authentication from "./Authentication.component";
import {
  AuthenticationFormState,
  AuthenticationFormField,
  AuthenticationFormAction
} from "./Authentication.types";
import store from "../../store";
import { login } from "./Authentication.actions";
import { withFirebase } from "../firebase/Firebase";
import { AUTH_FORM } from "utils/Constants";

const formEmailField: AuthenticationFormField = {
  id: "username",
  label: "Email",
  value: "",
  type: "text"
};

const formPasswordField: AuthenticationFormField = {
  id: "password",
  label: "Password",
  value: "",
  type: "password"
};

const defaultLoginFields: Array<AuthenticationFormField> = [
  formEmailField,
  formPasswordField
];

const defaultLoginActions: Array<AuthenticationFormAction> = [
  {
    id: "loginAction",
    label: "Login",
    onClick: () => {
      console.log("onClick login");

      const fieldNodes: NodeList = document.querySelectorAll(
        AUTH_FORM.SELECTOR_MATCH
      );
      const results: Array<string> = [];
      fieldNodes.forEach((item: any) => {
        results.push(item.firstElementChild.value);
      });

      store.dispatch(login(results[0], results[1]));
      // return true;
    }
  },
  {
    id: "navigateToCreateAccountAction",
    label: "Create Account",
    onClick: (history: any) => {
      history.push("/create");
    }
  }
];

const mapStateToProps = (
  state: any,
  { formTitle, formFields }: AuthenticationFormState
) => ({
  formTitle: formTitle || "Login",
  formFields: formFields || defaultLoginFields,
  formActions: defaultLoginActions,
  shouldNavigate: state.userInfo.loggedIn || false,
  navigateToUrl: "/cookbook/" + state.userInfo.cookbookId
});

// const mapDispatchToProps = (dispatch: any, ownProps: any) => ({
//   on: (username: string, password: string) =>
//     dispatch(login(username, password, ownProps.firebase))
// });

const Connected = connect(mapStateToProps)(Authentication);

const LoginContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(LoginContainer);
