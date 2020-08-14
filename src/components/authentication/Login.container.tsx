import React from "react";
import { connect, Provider } from "react-redux";
import Authentication from "./Authentication.component";
import {
  AuthenticationFormState,
  AuthenticationFormField,
  AuthenticationFormAction,
  FormFieldState
} from "./Authentication.types";
import store from "../../store";
import { login, dismissError } from "./Authentication.actions";
import { withFirebase } from "../firebase/Firebase";

const formEmailField: AuthenticationFormField = {
  id: "username",
  label: "Email",
  value: "",
  pattern: "^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$",
  type: "text",
  formError: { errorMessage: "Error: Email address is invalid" }
};

const formPasswordField: AuthenticationFormField = {
  id: "password",
  label: "Password",
  value: "",
  type: "password",
  formError: { errorMessage: "Error: Password address is invalid" }
};

const defaultLoginFields: Array<AuthenticationFormField> = [
  formEmailField,
  formPasswordField
];

const defaultLoginActions: Array<AuthenticationFormAction> = [
  {
    id: "loginAction",
    label: "Login",
    primary: true,
    onClick: (_history: any, options: Array<FormFieldState>) => {
      store.dispatch(login(options));
    }
  },
  {
    id: "navigateToCreateAccountAction",
    primary: false,
    label: "Create Account",
    onClick: (history: any) => {
      store.dispatch(dismissError());
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
  shouldNavigate: state.userInfo.loggedIn === true,
  navigateToUrl: "/cookbook/" + state.userInfo.cookbookId,
  errors: state.userInfo.error || ""
});

const mapDispatchToProps = (dispatch: any) => ({
  clearError: () => dispatch(dismissError())
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(Authentication);

const LoginContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(LoginContainer);
