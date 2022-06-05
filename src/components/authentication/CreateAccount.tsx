import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import { HEADER_TYPE } from '../header/Header.types';
import { createAccount, logout } from './Authentication.actions';
import { useAppDispatch, useAppSelector } from 'hooks';
import {
    AuthenticationFormAction,
    AuthenticationFormField,
} from './Authentication.types';
import store from 'store';
import Authentication from './Authentication.component';
import { isUserLoggedIn, userCookbookId } from './Authentication.reducer';

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

const defaultCreateAccountFields: Array<AuthenticationFormField> = [
    formEmailField,
    formPasswordField,
];

const defaultCreateAccountActions: Array<AuthenticationFormAction> = [
    {
        id: 'createAccountAction',
        label: 'Create Account',
        primary: true,
        onClick: (_navigate: any, options: any) => {
            const { email, password } = options;
            store.dispatch(createAccount(email, password));
        },
    },
];

const CreateAccount: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const cookbookId: string = useAppSelector(userCookbookId);
    const isLoggedIn: boolean = useAppSelector(isUserLoggedIn);

    useEffect(() => {
        if (isLoggedIn && cookbookId && cookbookId.length > 0) {
            navigate('/cookbook/' + cookbookId, { replace: true });
        }
    });

    return (
        <>
            <Header
                type={HEADER_TYPE.LOGIN}
                logoutUser={() => dispatch(logout)}
                backButtonTooltip="Back to Home"
            />
            <Authentication
                formActions={defaultCreateAccountActions}
                formFields={defaultCreateAccountFields}
                formTitle="Create account"
                navigateToUrl={'/cookbook/' + cookbookId}
                shouldNavigate={false}
                hasError={false}
            />
        </>
    );
};

export default CreateAccount;
