import React, { useState } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import Search from '../fields/search/Search.component';
import { Icon } from '@rmwc/icon';
import Logo from '../../images/icon-pot.svg';
import Filter, { FiterSearchProps } from '../filter/Filter.component';
import {
    TopAppBar,
    TopAppBarRow,
    TopAppBarSection,
    TopAppBarTitle,
    TopAppBarFixedAdjust,
    TopAppBarNavigationIcon,
} from '@rmwc/top-app-bar';
import { Tooltip } from '@rmwc/tooltip';
import { AccountHeaderType, HeaderType, HEADER_TYPE, LoginHeaderType, RecipeDetailsHeaderType } from './Header.types';

export const RecipeDetailsHeader: React.FunctionComponent<RecipeDetailsHeaderType> = 
({title}: RecipeDetailsHeaderType) => {
    const navigate: NavigateFunction = useNavigate();
    return (
        <>
            <TopAppBar fixed>
                <TopAppBarRow>
                    <TopAppBarSection>
                        <TopAppBarNavigationIcon
                            icon="arrow_back"
                            onClick={() => navigate(-1)}
                        />
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <TopAppBarNavigationIcon icon="share" />
                        <TopAppBarNavigationIcon icon="favorite" />
                        <TopAppBarNavigationIcon icon="more_vert" />
                    </TopAppBarSection>
                </TopAppBarRow>
                <TopAppBarRow>
                    <TopAppBarSection>
                        <TopAppBarTitle>Some text {title}</TopAppBarTitle>
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust prominent />
        </>
    );
};

export const CookbookHeader: React.FunctionComponent = () => {
    const navigate: NavigateFunction = useNavigate();
    const [openFilter, setOpenFilter] = useState(false);
    console.log('called cookbookHeader');
    return (
        <>
            <TopAppBar fixed>
                <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <Icon
                            icon={Logo}
                            name="Cookbook"
                            style={{ marginLeft: '0.25rem' }}
                        />
                        <Search
                            submit={(val: string) => {
                                console.log('Clicked sumbit with: ' + val);
                            }}
                        />
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <TopAppBarNavigationIcon
                            icon="account_circle"
                            // onClick={logoutUser}
                            onClick={() => navigate('/account')}
                        />
                        <TopAppBarNavigationIcon
                            icon="filter_list"
                            onClick={() => setOpenFilter(!openFilter)}
                        />
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust />
            <Filter
                visible={openFilter}
                reset={() => console.log('Filter reset')}
                submit={(filterData?: FiterSearchProps) => {
                    console.log(
                        'Filter submit: ' +
                            (filterData ? filterData.russian : 'nope')
                    );
                }}
            />
        </>
    );
};

export const DefaultHeader: React.FunctionComponent = () => {
    const navigate: NavigateFunction = useNavigate();
    return (
        <>
            <TopAppBar fixed>
                <TopAppBarRow>
                    <TopAppBarSection alignStart>
                        <Icon
                            icon="/images/icon-pot.svg"
                            name="Cookbook"
                            style={{ marginLeft: '0.25rem' }}
                        />
                        <TopAppBarTitle>Cookbook</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <TopAppBarNavigationIcon
                            className={'material-icons-outlined'}
                            icon="account_circle"
                            onClick={() => navigate('/login')}
                        />
                        <TopAppBarNavigationIcon icon="menu_book" />
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust />
        </>
    );
};

export const LoginHeader: React.FunctionComponent<LoginHeaderType> = ({ backButtonTooltip }: LoginHeaderType) => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <>
            <TopAppBar fixed>
                <TopAppBarRow>
                    <TopAppBarSection>
                        <Tooltip content={backButtonTooltip}>
                            <TopAppBarNavigationIcon
                                icon="arrow_back"
                                onClick={() => navigate(-1)}
                            />
                        </Tooltip>
                        <TopAppBarTitle>Cookbook</TopAppBarTitle>
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust />
        </>
    );
};

export const AccountHeader: React.FunctionComponent<AccountHeaderType> = 
    ({ backButtonTooltip, title, logoutUser }: AccountHeaderType) => {

    const navigate: NavigateFunction = useNavigate();

    return (
        <>
            <TopAppBar fixed>
                <TopAppBarRow>
                    <TopAppBarSection>
                        <Tooltip content={backButtonTooltip}>
                            <TopAppBarNavigationIcon
                                icon="arrow_back"
                                onClick={() => navigate(-1)}
                            />
                        </Tooltip>
                        <TopAppBarTitle>{title}</TopAppBarTitle>
                    </TopAppBarSection>
                    <TopAppBarSection alignEnd>
                        <TopAppBarNavigationIcon
                            // className={'material-icons-outlined'}
                            icon="logout"
                            onClick={() => logoutUser()}
                        />
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust />
        </>
    );
};

const Header = (props: HeaderType) => {
    const { type } = props;

    switch (type) {
        case HEADER_TYPE.LOGIN:
            return <LoginHeader {...props as LoginHeaderType} />;
        case HEADER_TYPE.RECIPE_DETAILS:
            return <RecipeDetailsHeader {...props as RecipeDetailsHeaderType} />
        case HEADER_TYPE.COOKBOOK:
            return <CookbookHeader />
        case HEADER_TYPE.ACCOUNT: 
            return <AccountHeader {...props as AccountHeaderType} />;
        default:
            return <DefaultHeader />;
    }
};

export default Header;
