import React from "react";
import { connect, Provider } from "react-redux";
import Authentication from "./Authentication.component";
import {
  AuthenticationFormAction,
  AuthenticationFormField,
  AuthenticationFormState,
  FormError,
  FormFieldState
} from "./Authentication.types";
import store from "../../store";
import { createAccount, dismissError } from "./Authentication.actions";
import * as selector from "./Authentication.selector";
import { withFirebase } from "../firebase/Firebase";

const formEmailField: AuthenticationFormField = {
  id: "email",
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
  type: "new-password",
  formError: { errorMessage: "Error: Password is invalid" }
};

const getEmailField = (state: any) => {
  if (state.userInfo.error) {
    const errorList: Array<string> = state.userInfo.error.split(",");
    const emailField = formEmailField;
    const emailError: FormError = {
      errorMessage: "asdasd"
    };

    emailField.formError = emailError;

    return emailField;
  }

  return formEmailField;
};

const defaultCreateAccountFields = (state: any) => {
  return [getEmailField(state), formPasswordField];
};

const defaultCreateAccountActions: Array<AuthenticationFormAction> = [
  {
    id: "createAccountAction",
    primary: true,
    label: "Create",
    onClick: (_history: any, options: Array<FormFieldState>) => {
      // const { email, password } = options;
      store.dispatch(createAccount(options));
    }
  }
];

const mapStateToProps = (
  state: any,
  { formTitle, formFields }: AuthenticationFormState
) => ({
  formTitle: formTitle || "Create Account",
  formFields: formFields || defaultCreateAccountFields(state),
  formActions: defaultCreateAccountActions,
  shouldNavigate: selector.userLoggedIn(state),
  navigateToUrl: "/cookbook/" + state.userInfo.cookbookId,
  errors: state.userInfo.error || "",
  formErrors: selector.hasCreateAccountFormErrors(state)
});

const mapDispatchToProps = (dispatch: any) => ({
  clearError: () => dispatch(dismissError())
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(Authentication);

const CreateAccountContainer = (props: any) => (
  <Provider store={store}>
    <Connected {...props} />
  </Provider>
);

export default withFirebase(CreateAccountContainer);
