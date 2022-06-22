import React, { useEffect } from 'react';
import { withFirebase } from '../firebase/FirebaseContext';
import { authVerified } from '../authentication/Authentication.reducer';
import { checkAuthState } from '../authentication/Authentication.actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setActiveScene } from './sceneSlice';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
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
    const { id } = useParams();
    const location = useLocation();
    const doLogout: boolean = useAppSelector(shouldLogout);

    useEffect(() => {
        if (!isAuthVerified) {
            dispatch(checkAuthState());
        } else if (doLogout && authRequired) {
            navigate('/', {replace: true});
        }
    }, [isAuthVerified, doLogout, authRequired]);

    useEffect(() => {
        console.log('params: ' + id + ', location: ' + location.pathname);
        dispatch(setActiveScene(sceneName));
    }, [sceneName]);

    console.log('[Scene.component] ' + sceneName);

    return (
        <>
            {!isAuthVerified && <LoadingScreen />}
            {isAuthVerified && children}
        </>
    );
};

export default withFirebase(Scene);
