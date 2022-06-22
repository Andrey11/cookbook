/* eslint-disable @typescript-eslint/no-empty-function */
import React, { useState } from 'react';
import { NavigateFunction, useNavigate, useParams } from 'react-router-dom';
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
import { HeaderProps, LoginHeaderProps } from './Header.types';

const recipeDetailsHeader = (id: string | undefined, navigate: any) => {
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
                        <TopAppBarTitle>Some text {id}</TopAppBarTitle>
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust prominent />
        </>
    );
};

const cookbookHeader = (
    id: string | undefined, 
    logoutUser: () => void, 
    navigate: NavigateFunction
) => {
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

const defaultHeader = (id: string | undefined, navigate: NavigateFunction) => {
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

export const LoginHeader: React.FunctionComponent<LoginHeaderProps> = ({
    backButtonTooltip,
}: LoginHeaderProps) => {
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
                    </TopAppBarSection>
                </TopAppBarRow>
            </TopAppBar>
            <TopAppBarFixedAdjust />
        </>
    );
};

const Header = ({ type, logoutUser, backButtonTooltip = '' }: HeaderProps) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const logoutFn = logoutUser ? logoutUser : () => { return; };

    switch (type) {
        case 'login':
            return <LoginHeader backButtonTooltip={backButtonTooltip} />;
        case 'recipe-details':
            return recipeDetailsHeader(id, navigate);
        case 'cookbook':
            return cookbookHeader(id, logoutFn, navigate);
        default:
            return defaultHeader(id, navigate);
    }
};

export default Header;
