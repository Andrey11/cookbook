export const userLoggedIn = (state: any) => {
  return state.userInfo.loggedIn === true;
};
export const hasLoginFormErrors = (state: any) => {
  return state.ui.loginForm.error.hasError === true;
};
export const hasCreateAccountFormErrors = (state: any) => {
  return state.ui.createAccountForm.error.hasError === true;
};
