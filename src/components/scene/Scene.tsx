import React, { useEffect } from 'react';
// import { Typography } from "@rmwc/typography";
import styles from './Scene.module.scss';
import { CircularProgress } from '@rmwc/circular-progress';
import { withFirebase } from 'components/firebase/FirebaseContext';
import { authVerified } from '../authentication/Authentication.reducer';
import { checkAuthState } from 'components/authentication/Authentication.actions';
import { useAppDispatch, useAppSelector } from 'hooks';
import { setActiveScene } from './sceneSlice';

type SceneProps = {
    sceneName: string;
    children: React.ReactElement;
};

const Scene: React.FunctionComponent<SceneProps> = (props: SceneProps) => {
    const { sceneName, children } = props;

    const isAuthVerified: boolean = useAppSelector(authVerified);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!isAuthVerified) {
            dispatch(checkAuthState());
        }
    }, [isAuthVerified]);

    useEffect(() => {
        dispatch(setActiveScene(sceneName));
    }, [sceneName]);

    const createInitScreen = () => {
        return (
            <div className={styles.SplashScreen}>
                <img src="/images/icon-pot.svg" alt="Cookbook logo"></img>
                <div className={styles.InfiniteSpinner}>
                    <CircularProgress size="xlarge" />
                </div>
            </div>
        );
    };

    const loadScreen = () => {
        console.log('[Scene.component] ' + sceneName);

        if (!isAuthVerified) {
            return createInitScreen();
        }
        // return createInitScreen();
        return <>{children}</>;
    };

    return <>{loadScreen()}</>;
};

export default withFirebase(Scene);
