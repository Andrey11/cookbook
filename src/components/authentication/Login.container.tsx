import React from "react";
import { connect, Provider } from "react-redux";
import Authentication from "./Authentication.component";
import {
  AuthenticationFormState,
  AuthenticationFormField,
  AuthenticationFormAction,
} from "./Authentication.types";
import store from "../../store";
import { login } from "./Authentication.actions";
import { withFirebase } from "../firebase/Firebase";
// import { AUTH_FORM } from "utils/Constants";

const formEmailField: AuthenticationFormField = {
  id: "username",
  label: "Email",
  value: "",
  type: "text",
};

const formPasswordField: AuthenticationFormField = {
  id: "password",
  label: "Password",
  value: "",
  type: "password",
};

const defaultLoginFields: Array<AuthenticationFormField> = [
  formEmailField,
  formPasswordField,
];

const defaultLoginActions: Array<AuthenticationFormAction> = [
  {
    id: "loginAction",
    label: "Login",
    primary: true,
    onClick: (_navigate: any, options: any) => {
      const { email, password } = options;
      store.dispatch(login(email, password));
    },
  },
  {
    id: "navigateToCreateAccountAction",
    primary: false,
    label: "Create Account",
    onClick: (navigate: any) => {
      navigate("/create");
    },
  },
];

const mapStateToProps = (
  state: any,
  { formTitle, formFields }: AuthenticationFormState
) => ({
  formTitle: formTitle || "Login",
  formFields: formFields || defaultLoginFields,
  formActions: defaultLoginActions,
  shouldNavigate: state.userInfo.loggedIn || false,
  navigateToUrl: "/cookbook/" + state.userInfo.cookbookId,
});

const Connected = connect(mapStateToProps)(Authentication);

const LoginContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(LoginContainer);
