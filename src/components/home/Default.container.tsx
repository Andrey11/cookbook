import React from 'react';
import { connect, Provider } from 'react-redux';
import Default from './Default.component';
import store from '../../store';
import { withFirebase } from '../firebase/Firebase';
import { loadAllRecipes } from 'components/cookbook/CookbookScene.actions';
import * as selector from 'components/cookbook/CookbookScene.selector';

const mapStateToProps = (state: any) => ({
    recipes: selector.allRecipesList(state),
    shouldReloadAllRecipes: selector.shouldReloadAllRecipesList(state),
});

const mapDispatchToProps = (dispatch: any) => ({
    loadAllRecipes: () => dispatch(loadAllRecipes()),
});

const Connected = connect(mapStateToProps, mapDispatchToProps)(Default);

// TODO: should pass a list of card items (recipes)
const DefaultContainer = (props: any) => (
    <Provider store={store}>
        <Connected {...props} />
    </Provider>
);

export default withFirebase(DefaultContainer);
