import React from 'react';
import Authentication from './Authentication.component';
import {
    AuthenticationFormField,
    AuthenticationFormAction,
} from './Authentication.types';
import store from '../../store';
import { login, logout } from './Authentication.actions';
import { withFirebase } from '../firebase/Firebase';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
    isError,
    isUserLoggedIn,
    userCookbookId,
} from './Authentication.reducer';
import Header from 'components/header/Header';
import { HEADER_TYPE } from 'components/header/Header.types';
// import { AUTH_FORM } from "utils/Constants";

const formEmailField: AuthenticationFormField = {
    id: 'username',
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

const defaultLoginFields: Array<AuthenticationFormField> = [
    formEmailField,
    formPasswordField,
];

const defaultLoginActions: Array<AuthenticationFormAction> = [
    {
        id: 'loginAction',
        label: 'Login',
        primary: true,
        onClick: (_navigate: any, options: any) => {
            const { email, password } = options;
            store.dispatch(login(email, password));
        },
    },
    {
        id: 'navigateToCreateAccountAction',
        primary: false,
        label: 'Create',
        onClick: (navigate: any) => {
            navigate('/create');
        },
    },
    {
        id: 'navigateToResetPasswordAction',
        primary: false,
        label: 'Reset',
        onClick: (navigate: any) => {
            navigate('/reset');
        },
    },
];

const Login: React.FunctionComponent = (props: any) => {
    const { formTitle, formFields } = props;
    const cookbookId: string = useAppSelector(userCookbookId);
    const isLoggedIn: boolean = useAppSelector(isUserLoggedIn);
    const isLoginError: boolean = useAppSelector(isError);
    const dispatch = useAppDispatch();

    return (
        <>
            <Header
                type={HEADER_TYPE.LOGIN}
                logoutUser={() => dispatch(logout)}
                backButtonTooltip="Back to Home"
            />
            <Authentication
                formActions={defaultLoginActions}
                formFields={formFields || defaultLoginFields}
                formTitle={formTitle || 'Login'}
                navigateToUrl={'/cookbook/' + cookbookId}
                shouldNavigate={isLoggedIn}
                hasError={isLoginError}
            />
        </>
    );
};

export default withFirebase(Login);
