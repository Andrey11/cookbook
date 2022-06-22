import React, { useEffect } from 'react';
import { withFirebase } from '../firebase/FirebaseContext';
import { 
    authVerified, 
    getUserId, 
    isUserInfoLoaded, 
    isUserLoggedIn, 
    loadUserDataAsync 
} from '../authentication/Authentication.reducer';
import { checkAuthState } from '../authentication/Authentication.actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveScene } from './sceneSlice';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import { shouldLogout } from '../cookbook/CookbookScene.selector';

// import styles from './Scene.module.scss';

type SceneProps = {
    sceneName: string;
    authRequired: boolean;
    children: React.ReactElement;
};

const Scene: React.FunctionComponent<SceneProps> = (props: SceneProps) => {
    const { sceneName, authRequired, children } = props;

    const isAuthVerified: boolean = useAppSelector(authVerified);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    // const { id } = useParams();
    // const location = useLocation();
    const doLogout: boolean = useAppSelector(shouldLogout);
    const userInfoLoaded: boolean = useAppSelector(isUserInfoLoaded);
    const userLoggedIn: boolean = useAppSelector(isUserLoggedIn); 
    const userId: string = useAppSelector(getUserId);

    useEffect(() => {
        if (!isAuthVerified) {
            console.log('[Scene] auth is not verified');
            dispatch(checkAuthState());
        } else if (isAuthVerified && userLoggedIn && !userInfoLoaded) {
            console.log('[Scene] user info is not yet loaded');
            dispatch(loadUserDataAsync(userId));
        } else if (doLogout && authRequired) {
            navigate('/', {replace: true});
        }
    }, [isAuthVerified, doLogout, authRequired, userLoggedIn, userInfoLoaded, userId]);

    useEffect(() => {
        console.log('[Scene.component] ' + sceneName);
        dispatch(setActiveScene(sceneName));
    }, [sceneName]);

    return (
        <>
            {!isAuthVerified && <LoadingScreen />}
            {isAuthVerified && children}
        </>
    );
};

export default withFirebase(Scene);
