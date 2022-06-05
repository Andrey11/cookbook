import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../header/Header';
import { HEADER_TYPE } from '../header/Header.types';
import { logout, resetPassword } from './Authentication.actions';
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

const defaultResetPasswordField: Array<AuthenticationFormField> = [
    formEmailField,
];

const defaultResetPasswordActions: Array<AuthenticationFormAction> = [
    {
        id: 'resetPasswordAction',
        label: 'Reset Password',
        primary: true,
        onClick: (_navigate: any, options: any) => {
            const { email } = options;
            store.dispatch(resetPassword(email));
        },
    },
];

const ResetPassword: React.FunctionComponent = () => {
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
                backButtonTooltip="Return to login"
            />
            <Authentication
                formActions={defaultResetPasswordActions}
                formFields={defaultResetPasswordField}
                formTitle="Reset Password"
                navigateToUrl={'/cookbook/' + cookbookId}
                shouldNavigate={false}
                hasError={false}
            />
        </>
    );
};

export default ResetPassword;
