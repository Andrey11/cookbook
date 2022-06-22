import React from 'react';
import { CircularProgress } from '@rmwc/circular-progress';
import styles from './Scene.module.scss';

const LoadingScreen: React.FunctionComponent = () => {
    
    return (
        <div className={styles.SplashScreen}>
            <img src="/images/icon-pot.svg" alt="Cookbook logo"></img>
            <div className={styles.InfiniteSpinner}>
                <CircularProgress size="xlarge" />
            </div>
        </div>
    );
};

export default LoadingScreen;
