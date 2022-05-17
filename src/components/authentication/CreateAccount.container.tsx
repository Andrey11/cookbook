import React from 'react';
import { connect, Provider } from 'react-redux';
import Authentication from './Authentication.component';
import {
    AuthenticationFormAction,
    AuthenticationFormField,
    AuthenticationFormState,
} from './Authentication.types';
import store from '../../store';
import { createAccount } from './Authentication.actions';
import { withFirebase } from '../firebase/Firebase';

const formEmailField: AuthenticationFormField = {
    id: 'email',
    label: 'Email',
    value: '',
    type: 'text',
};

const formPasswordField: AuthenticationFormField = {
    id: 'password',
    label: 'Password',
    value: '',
    type: 'password',
};

const defaultCreateAccountFields: Array<AuthenticationFormField> = [
    formEmailField,
    formPasswordField,
];

const defaultCreateAccountActions: Array<AuthenticationFormAction> = [
    {
        id: 'createAccountAction',
        primary: true,
        label: 'Create',
        onClick: (_history: any, options: any) => {
            const { email, password } = options;
            store.dispatch(createAccount(email, password));
        },
    },
];

const mapStateToProps = (
    state: any,
    { formTitle, formFields }: AuthenticationFormState
) => ({
    formTitle: formTitle || 'Create Account',
    formFields: formFields || defaultCreateAccountFields,
    formActions: defaultCreateAccountActions,
    shouldNavigate: state.userInfo.loggedIn || false,
    navigateToUrl: '/cookbook/' + state.userInfo.cookbookId,
});

const Connected = connect(mapStateToProps)(Authentication);

const CreateAccountContainer = (props: any) => (
    <Provider store={store}>
        <Connected {...props} />
    </Provider>
);

export default withFirebase(CreateAccountContainer);
