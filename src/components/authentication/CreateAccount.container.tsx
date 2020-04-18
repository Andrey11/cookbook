import React from "react";
import { connect, Provider } from "react-redux";
import Authentication from "./Authentication.component";
import {
  AuthenticationFormAction,
  AuthenticationFormField,
  AuthenticationFormState
} from "./Authentication.types";
import store from "../../store";
import { createAccount } from "./Authentication.actions";
import { withFirebase } from "../firebase/Firebase";
import { AUTH_FORM } from "utils/Constants";

const formEmailField: AuthenticationFormField = {
  id: "username",
  label: "Username",
  value: "",
  type: "text"
};

const formPasswordField: AuthenticationFormField = {
  id: "password",
  label: "Password",
  value: "",
  type: "password"
};

const defaultCreateAccountFields: Array<AuthenticationFormField> = [
  formEmailField,
  formPasswordField
];

const defaultCreateAccountActions: Array<AuthenticationFormAction> = [
  {
    id: "createAccountAction",
    label: "CreateAccount",
    onClick: () => {
      console.log("onClick create account");

      const fieldNodes: NodeList = document.querySelectorAll(
        AUTH_FORM.SELECTOR_MATCH
      );
      const results: Array<string> = [];
      fieldNodes.forEach((item: any) => {
        results.push(item.firstElementChild.value);
      });

      store.dispatch(createAccount(results[0], results[1]));
      // return true;
    }
  }
];

const mapStateToProps = (
  state: any,
  { formTitle, formFields }: AuthenticationFormState
) => ({
  formTitle: formTitle || "Create Account",
  formFields: formFields || defaultCreateAccountFields,
  formActions: defaultCreateAccountActions,
  shouldNavigate: state.userInfo.loggedIn || false,
  navigateToUrl: "/cookbook/" + state.userInfo.cookbookId
});

const Connected = connect(mapStateToProps)(Authentication);

const CreateAccountContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(CreateAccountContainer);
