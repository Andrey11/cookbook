import React from 'react';
// import { useNavigate, useParams } from "react-router-dom";
import { Grid, GridCell } from '@rmwc/grid';
import {
    ImageList,
    ImageListItem,
    ImageListImageAspectContainer,
    ImageListImage,
    ImageListSupporting,
    ImageListLabel,
} from '@rmwc/image-list';
import Header from '../header/Header';
import { List, CollapsibleList, SimpleListItem } from '@rmwc/list';
import { HEADER_TYPE } from '../header/Header.types';
import { useAppDispatch } from '../../hooks';
import { logout } from '../authentication/Authentication.actions';

const RecipeCardDetailsScene: React.FunctionComponent = () => {
    // const history = useNavigate();
    // const { id } = useParams();
    const dispatch = useAppDispatch();

    return (
        <>
            <Header
                type={HEADER_TYPE.RECIPE_DETAILS}
                logoutUser={() => dispatch(logout)}
                backButtonTooltip="Back to Home"
            />

            <Grid>
                <GridCell span={12}>
                    <List>
                        <CollapsibleList
                            handle={
                                <SimpleListItem
                                    text="Photos"
                                    graphic="photo_library"
                                    metaIcon="chevron_right"
                                />
                            }
                        >
                            <ImageList>
                                {[
                                    '/images/mb-bg-fb-16.png',
                                    '/images/mb-bg-fb-16.png',
                                ].map((src) => (
                                    <ImageListItem
                                        key={
                                            src +
                                            Math.round(Math.random() * 100)
                                        }
                                        style={{
                                            margin: '2px',
                                            width: 'calc(100% / 5 - 4.2px)',
                                        }}
                                    >
                                        <ImageListImageAspectContainer
                                            style={{
                                                paddingBottom:
                                                    'calc(100% / 1.5)',
                                            }}
                                        >
                                            <ImageListImage src={src} />
                                        </ImageListImageAspectContainer>
                                        <ImageListSupporting>
                                            <ImageListLabel>
                                                Text label
                                            </ImageListLabel>
                                        </ImageListSupporting>
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </CollapsibleList>
                    </List>
                </GridCell>
                <GridCell span={12}>
                    <List>
                        <CollapsibleList
                            handle={
                                <SimpleListItem
                                    text="Ingridients"
                                    graphic="shopping_basket"
                                    metaIcon="chevron_right"
                                />
                            }
                        >
                            <SimpleListItem text="Orange1" />
                            <SimpleListItem text="Orange2" />
                        </CollapsibleList>
                    </List>
                </GridCell>
                <GridCell span={12}>
                    <List>
                        <CollapsibleList
                            handle={
                                <SimpleListItem
                                    text="Cooking instructions"
                                    graphic="restaurant"
                                    metaIcon="chevron_right"
                                />
                            }
                        >
                            <SimpleListItem text="Orange1" />
                            <SimpleListItem text="Orange2" />
                        </CollapsibleList>
                    </List>
                </GridCell>
                <GridCell span={12}>
                    <List>
                        <CollapsibleList
                            handle={
                                <SimpleListItem
                                    text="Additional comments"
                                    graphic="menu_book"
                                    metaIcon="chevron_right"
                                />
                            }
                        >
                            <SimpleListItem text="Orange1" />
                            <SimpleListItem text="Orange2" />
                        </CollapsibleList>
                    </List>
                </GridCell>
                <GridCell span={12}>
                    <List>
                        <CollapsibleList
                            handle={
                                <SimpleListItem
                                    text="Tags"
                                    graphic="label"
                                    metaIcon="chevron_right"
                                />
                            }
                        >
                            <SimpleListItem text="Orange1" />
                            <SimpleListItem text="Orange2" />
                        </CollapsibleList>
                    </List>
                </GridCell>
            </Grid>
        </>
    );
};

export default RecipeCardDetailsScene;
